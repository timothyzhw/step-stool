<template>
    <div class="output">
        <div class="bar">
            <Button @click="build">编译</Button>
            <Button @click="buildCleanLog">清空</Button>
        </div>
        <div class="logs">
            <div>
                <div v-for="log in logs">
                    <pre v-if="log.indexOf('Error')>0 || log.indexOf('error')>0" style="color: red;">{{log}}</pre>
                    <pre v-else>{{log}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import iconv from 'iconv-lite';
  import { mapState, mapActions } from 'vuex';
  import cf from '../../util/build/codeConfig';
  import Process from '../../util/process';


  export default {
    name: 'BuildOutput',
    data() {
      return {
        indeterminate: true,
        checkAll: false,
        solutionsList: [],
        checkSolutions: [],
        errorLogs: [],
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
      addSolution() {
        cf.add();
      },
      async build() {
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
              this.errorLogs.push(data.toString());
            },
            (code) => {
              console.log(`end with ${code}`);
            });
          if (result !== 0) {
            console.error('build error~', result);
            return;
          }
        }
      },
    },
    created() {
      // cf.load();
    }
    ,
  }
  ;
</script>

<style scoped>
    .output .bar {
        font-size: 20px;
        padding: 5px;
        text-align: right;
        height: 40px;
        border-bottom: 1px solid #e1e4e8;
    }

    .output .bar i {
        cursor: pointer;
    }

    .logs {
        padding-left: 15px;
    }
</style>