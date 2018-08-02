<template>
    <ssLayout>
        <template>
            <Header :style="{background: '#fff'}">
                <Button @click="gitstatus()">git status</Button>
                <Button @click="spawn()">ifconfig</Button>
                <Button @click="testfile()">test</Button>
            </Header>
            <Content class="main-container">
                <Content class="content">
                    <Split v-model="split1">
                        <div slot="left" class="split-left">
                            <solution></solution>
                        </div>
                        <div slot="right" class="split-right">
                            <outputSection></outputSection>

                        </div>
                    </Split>

                </Content>
            </Content>
        </template>
    </ssLayout>

</template>


<script>
  import { GitProcess, GitError, IGitResult } from 'dugite';


  import Process from '../util/process';
  import ssLayout from './StepStoolLayout.vue';
  import { code } from '../util/datastore';
  import cf from '../util/build/codeConfig';

  import solution from './NetCoreBuild/SolutionList.vue';
  import outputSection from './NetCoreBuild/BuildOutput.vue';

  const pathToRepository = '/home/timothy/Documents/step-stool/';
  export default {
    name: 'NetCoreBuild',
    data() {
      return {
        split1: 0.3,
        errorText: '',
        statusText: '',
        spawnText: '',
        logs: [],
        errorLogs: [],
        switch1: false,
      };
    },
    components: {
      ssLayout,
      solution,
      outputSection
    },
    methods: {
      async gitstatus() {
        // const result = await GitProcess.exec(['status'], pathToRepository);
        // if (result.exitCode === 0) {
        //   const output = result.stdout;
        //   console.log(output);
        //   this.statusText = output;
        //   // do some things with the output
        // } else {
        //   const error = result.stderr;
        //   this.errorText = error;
        //   console.log(error);
        //   // error handling
        // }
        // console.log('test');
      },
      async spawn() {
        // const result = await Process.exec('ifconfig');
        // if (result.exitCode === 0) {
        //   const output = result.stdout;
        //   console.log(output);
        //   this.spawnText = output;
        //   // do some things with the output
        // } else {
        //   const error = result.stderr;
        //   this.errorText = error;
        //   console.log(error);
        //   // error handling
        // }
        const process = await Process.spawnSync('dotnet', null, null,
          // const process = Process.spawnUtil('pwd', [], null,
          (data) => {
            // console.log(`msg: ${data}`);
            this.logs.push(data.toString());
          },
          (data) => {
            console.log(`error msg: ${data}`);
            this.errorLogs.push(data.toString());
          },
          (code) => {
            console.log(`end with ${code}`);
          });
        // this.spawnText = Process.getName();
      },
      testfile() {
        // await this.$code.set('isSet', true).write();
        console.log('test');
        cf.add();
        // codeConfig.add();
        console.log('tested');
      },
    },
  };
  //  electron-run-shell-example-master
</script>

<style scoped>

    .main-container {
        padding: 0;
    }

    .content {
        /*border: 1px solid red;*/
        position: fixed;
        top: 50px;
        bottom: 10px;
        left: 45px;
        right: 0;
        border-top: 1px solid #e1e4e8;
    }

    .split-left, .split-right {
        height: 100%;
        overflow: auto;
        background-color: rgb(246, 248, 250);
    }



</style>
