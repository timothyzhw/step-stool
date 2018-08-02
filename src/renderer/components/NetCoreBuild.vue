<template>
    <ssLayout>
        <template>
            <Header class="header">
                <Split v-model="splitWidth">
                    <div slot="left" class="split-left-opt">
                        <solution-list-opt></solution-list-opt>
                    </div>
                    <div slot="right" class="split-right-opt">
                       <build-output-opt></build-output-opt>
                    </div>
                </Split>
            </Header>
            <Content class="main-container">
                <Content class="content">
                    <Split v-model="splitWidth">
                        <div slot="left" class="split-left">
                            <solution-list></solution-list>
                        </div>
                        <div slot="right" class="split-right">
                            <build-output></build-output>
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

  import SolutionList from './NetCoreBuild/SolutionList.vue';
  import BuildOutput from './NetCoreBuild/BuildOutput.vue';
  import SolutionListOpt from './NetCoreBuild/SolutionListOpt';
  import BuildOutputOpt from './NetCoreBuild/BuildOutputOpt';

  const pathToRepository = '/home/timothy/Documents/step-stool/';
  export default {
    name: 'NetCoreBuild',
    data() {
      return {
        splitWidth: 0.3,
        errorText: '',
        statusText: '',
        spawnText: '',
        logs: [],
        errorLogs: [],
        switch1: false,
      };
    },
    components: {
      BuildOutput,
      SolutionListOpt,
      ssLayout,
      SolutionList,
      BuildOutputOpt,
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

<style >
    .header {
        background: #363e4f;
        padding: 0;
        position: fixed;
        top: 0;
        height:52px;
        left: 44px;
        right: 0;
        line-height: 49px;
    }

    .main-container {
        padding: 0;
    }

    .content {
        /*border: 1px solid red;*/
        position: fixed;
        top: 52px;
        bottom: 10px;
        left: 44px;
        right: 0;
        border-top: 1px solid #e1e4e8;
    }

    .split-left, .split-right {
        height: 100%;
        overflow: auto;
        background-color: rgb(246, 248, 250);
    }
    .ivu-split-trigger-vertical {
        width: 4px;
        height: 100%;
        background: transparent;
        border-top: none;
        border-bottom: none;
        cursor: col-resize;
        border-right: none;
    }
    .ivu-split-trigger-bar-con{
        display:none;
    }


</style>
