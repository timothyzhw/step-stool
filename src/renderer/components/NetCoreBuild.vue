<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="20px" style="background-color: aqua">Aside</el-aside>
            <el-main>
                <Split style="height: 100%">
                    <SplitArea :size="20" :minSize="100">
                        panel left
                    </SplitArea>
                    <SplitArea :size="80">
                        panel right
                    </SplitArea>
                </Split>
            </el-main>
        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
  export default {
    name: 'NetBuild',
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