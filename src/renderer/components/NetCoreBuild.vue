<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="20px" style="background-color: aqua">Aside</el-aside>
            <el-main>
                <Split style="height: 100%">
                    <SplitArea :size="20" :minSize="100">
                        panel left
                        <el-button @click="gitstatus()">git status</el-button>
                    </SplitArea>
                    <SplitArea :size="80">
                        panel right
                       <span>{{statusText}}</span>
                    </SplitArea>
                </Split>
            </el-main>
        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
  import { GitProcess, GitError, IGitResult } from 'dugite';

  const pathToRepository = '/home/timothy/Documents/step-stool/';
  export default {
    name: 'NetBuild',
    data() {
      return {
        errorText: '',
        statusText: ''
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
      }

    }
  };
  //  electron-run-shell-example-master
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>