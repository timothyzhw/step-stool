<template>
    <div class="layout">
        <Sider class="sider"
               :collapsible="false" width="44">
            <Menu active-name="1-2" theme="dark" mode="vertical" width="auto" :open-names="['1']">
                <MenuItem name="1" title="build solution">
                    <Icon type="md-archive"/>
                </MenuItem>
                <MenuItem name="2" title="pack and deploy">
                    <Icon type="md-cloud-upload"/>
                </MenuItem>
                <MenuItem name="3" title="setting">
                    <Icon type="md-settings"/>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '45px'}">
            <Header :style="{background: '#fff'}"></Header>
            <Content  class="main-container">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>main</BreadcrumbItem>
                    <BreadcrumbItem>build</BreadcrumbItem>
                </Breadcrumb>
                <Content class="content">
                    <div style="height: 800px;">
                        <Split v-model="split1">
                            <div slot="left" class="demo-split-pane">
                                <Button @click="gitstatus()">git status</Button>
                                <Button @click="spawn()">build core</Button>
                            </div>
                            <div slot="right" class="demo-split-pane">
                                <span>{{statusText}}</span>
                                <span>{{spawnText}}</span>
                                <div v-for="log in logs">

                                    <pre v-if="log.indexOf('Error')>0 || log.indexOf('error')>0" style="color: red;">{{log}}</pre>
                                    <pre v-else>{{log}}</pre>
                                </div>
                                <div style="color:red" v-for="log in errorLogs">
                                    <div style="background-color: aqua">{{log}}</div>
                                </div>
                            </div>
                        </Split>
                    </div>
                </Content>
            </Content>
        </Layout>
    </div>
</template>


<script>
  import { GitProcess, GitError, IGitResult } from 'dugite';
  import Process from '../util/process';

  const pathToRepository = '/home/timothy/Documents/step-stool/';
  export default {
    name: 'NetBuild',
    data() {
      return {
        split1: 0.3,
        errorText: '',
        statusText: '',
        spawnText: '',
        logs: [],
        errorLogs: [],
      };
    },
    methods: {
      async gitstatus() {
        const result = await GitProcess.exec(['status'], pathToRepository);
        if (result.exitCode === 0) {
          const output = result.stdout;
          console.log(output);
          this.statusText = output;
          // do some things with the output
        } else {
          const error = result.stderr;
          this.errorText = error;
          console.log(error);
          // error handling
        }
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

    },
  };
  //  electron-run-shell-example-master
</script>

<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }
    .ivu-card{
        border-color: red !important;
    }

    .sider {
        position: fixed;
        height: 100%;
        left: 0;
        overflow: 'auto';
    }

    .sider .ivu-icon {
        font-size: 20px;
    }

    .sider .ivu-menu-item {
        padding: 14px 12px;
    }

    .main-container {
        padding: 0;
    }
    .content{
        border:1px solid #dcdee2;
    }

</style>