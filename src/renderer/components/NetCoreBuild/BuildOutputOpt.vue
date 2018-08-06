<template>

    <div class="bar">
        <Button type="primary" :loading="building" icon="ios-download" @click="build" size="small">
            <span v-if="!building">Build Solution</span>
            <span v-else>Building...</span>
        </Button>
        <Button @click="buildCleanLog" size="small" type="warning" icon="md-close-circle">clear logs</Button>

        <Select v-model="buildTool" size="small" style="width:80px">
            <Option value="MSBuild" key="MSBuild"> MSBuild</Option>
            <Option value="dotnet" key="dotnet"> dotnet</Option>
        </Select>

        <Select v-model="targetFramework" size="small" multiple style="width:210px">
            <Option value="netcoreapp2.1" key="netcore"> netcore</Option>
            <Option value="net461" key="framework"> framework</Option>
        </Select>
    </div>

</template>

<script>
  import iconv from 'iconv-lite';
  import { mapState, mapActions } from 'vuex';
  import cf from '../../util/build/codeConfig';
  import Process from '../../util/process';


  export default {
    name: 'BuildOutputOpt',
    data() {
      return {
        solutionsList: [],
        checkSolutions: [],
        building: false,
        tool: cf.tool,
        // buildTool: 'dotnet',
        // targetFramework: ['netcoreapp2.1'],
      };
    },
    computed: {
      ...mapState({
        solutions: state => state.Build.solutions,
        logs: state => state.Build.logs,
      }),
      buildTool: {
        get() {
          // console.log(cf.tool);
          return this.tool;
        },
        set(v) {
          cf.tool = v;
          this.tool = v;
        },
      },
      targetFramework: {
        get() {
          return cf.target;
        },
        set(v) {
          cf.target = v;
        },
      },
    },
    methods: {
      ...mapActions(['buildAddLog', 'buildCleanLog']),

      async build() {
        this.building = true;
        this.buildCleanLog();
        const slns = this.solutions.filter(sln => sln.checked);
        slns.sort((a, b) => a.index - b.index);
        for (let i = 0; i < slns.length; i += 1) {
          const sln = slns[i];
          const result = await Process.spawnAsync('C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Enterprise\\MSBuild\\15.0\\Bin\\MSBuild',
            this.buildArg(this.buildTool, sln.filepath, this.targetFramework), null,
            (data) => {
              this.buildAddLog({ log: iconv.decode(data, 'gbk') });
            },
            (data) => {
              console.log(`error msg: ${data}`);
            },
            (code) => {
              console.log(`end with ${code}`);
            });
          if (result.exitCode !== 0) {
            console.error('build error~', result);
            this.building = false;
            return;
          }
        }
        this.building = false;
      },
      buildArg(tool, filename, target) {
        if (tool === 'MSBuild') {
          const args = ['/t:restore', `/p:BuildPlatform=${process.platform}`];
          if (target) {
            target.forEach(t => args.push(`/p:TargetFramework=${t}`));
          }
          args.push(filename);
          return args;
          // 'MSBuild  /t:restore /p:TargetFramework=net461 /t:Rebuild ./${sln}/VaShare.${sln}.All.sln'
        } else if (tool === 'dotnet') {
          const args = ['build', filename, `-p:BuildPlatform=${process.platform}`];
          if (target) {
            target.forEach(t => args.push(`-p:TargetFramework=${t}`));
          }
          return args;
        }

        // '-p:TargetFramework=netcoreapp2.1', ];
        return [];
      },
    },
  }
  ;
</script>

<style scoped>
    .bar {
        font-size: 20px;
        padding: 0 20px;
        text-align: right;
        height: 40px;
    }

    .output .bar i {
        cursor: pointer;
    }

</style>