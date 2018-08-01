<template>
    <div class="layout">
        <Sider class="sider"
               :collapsible="false" width="44">
            <Menu active-name="1-2" theme="dark" mode="vertical" width="auto" :open-names="['1']">
                <MenuItem name="1">
                    <Tooltip content="build solution" placement="right">
                        <Icon type="ios-download" />
                    </Tooltip>
                </MenuItem>
                <MenuItem name="2">
                    <Tooltip content="pack and deploy" placement="right">
                        <Icon type="md-cloud-upload"/>
                    </Tooltip>
                </MenuItem>
                <MenuItem name="3">
                    <Tooltip content="setting" placement="right">
                        <Icon type="md-settings"/>
                    </Tooltip>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '45px'}" class="container">
            <slot></slot>

        </Layout>
    </div>
</template>


<script>
  import { GitProcess, GitError, IGitResult } from 'dugite';
  import Process from '../util/process';

  const pathToRepository = '/home/timothy/Documents/step-stool/';
  export default {
    name: 'ss_layout'
  };
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

    .ivu-card {
        border-color: red !important;
    }

    .sider {
        position: fixed;
        height: 100%;
        left: 0;
        overflow: auto;
    }

    .sider .ivu-icon {
        font-size: 20px;
    }

    .sider .ivu-menu-item {
        padding: 14px 12px;
    }

    .container {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 10px;
        left: 0;
    }

</style>