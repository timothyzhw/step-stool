<template>
    <ssLayout>
        <template>
            <Header :style="{background: '#fff'}">
                <Button @click="gitstatus()">git status</Button>
                <Button @click="spawn()">ifconfig</Button>
                <Button @click="testfile()">test</Button>
            </Header>
            <Content class="main-container">
                <Breadcrumb>
                    <BreadcrumbItem>main</BreadcrumbItem>
                    <BreadcrumbItem>build</BreadcrumbItem>
                </Breadcrumb>
                <Content class="content">
                    <Split v-model="split1">
                        <div slot="left" class="split-left">
                            <solution></solution>
                        </div>
                        <div slot="right" class="split-right">
                            <span>{{statusText}}</span>
                            <span>{{spawnText}}</span>
                            <div v-for="log in logs">

                                <pre v-if="log.indexOf('Error')>0 || log.indexOf('error')>0"
                                     style="color: red;">{{log}}</pre>
                                <pre v-else>{{log}}</pre>
                            </div>
                            <div style="color:red" v-for="log in errorLogs">
                                <div style="background-color: aqua">{{log}}</div>
                            </div>
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
        console.log('test');
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
        const process = Process.spawnUtil('dotnet', ['build', '/home/tim/Documents/vashare/vashare/Core/VaShare.Core.All.sln', '-p:TargetFramework=netstandard2.0', '-p:BuildPlatform=linux'], null,
          // const process = Process.spawnUtil('pwd', [], null,
          (data) => {
            console.log(`msg: ${data}`);
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
        top: 90px;
        bottom: 10px;
        left: 46px;
        right: 0;
    }

    .split-left, .split-right {
        height: 100%;
        overflow: auto;
    }

    .split-left{
        background-color: #dcdcdc;
    }

</style>
