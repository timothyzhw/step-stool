<template>

    <div class="bar">
        <Button type="primary" :loading="building" icon="ios-download" @click="build" size="small">
            <span v-if="!building">Build Solution</span>
            <span v-else>Building...</span>
        </Button>

        <Button @click="buildCleanLog" size="small" type="warning">clear logs</Button>

        <Select v-model="buildTool" size="small" style="width:80px">
            <Option value="MSBuild" key="MSBuild"> MSBuild</Option>
            <Option value="dotnet" key="dotnet"> dotnet</Option>
        </Select>

        <Select v-model="targetFramework" size="small"  multiple style="width:210px">
            <Option value="netcore" key="netcore"> netcore</Option>
            <Option value="framework" key="framework"> framework</Option>
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
        buildTool: 'MSBuild',
        targetFramework: [],
      };
    },
    computed: {
      ...mapState({
        solutions: state => state.Build.solutions,
        logs: state => state.Build.logs,
      }),
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
          const result = await Process.spawnAsync('dotnet', cf.buildArg(sln.filepath), null,
            (data) => {
              this.buildAddLog({ log: iconv.decode(data, 'gbk') });
            },
            (data) => {
              console.log(`error msg: ${data}`);
            },
            (code) => {
              console.log(`end with ${code}`);
            });
          if (result !== 0) {
            console.error('build error~', result);
            this.building = false;
            return;
          }
        }
        this.building = false;
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