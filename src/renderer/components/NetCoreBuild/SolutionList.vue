<template>
    <div>
        <div class="bar">
            <Icon type="md-add-circle" @click="addSolution()"/>
            <Icon type="md-remove-circle"/>
        </div>

        <Menu theme="dark">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="md-filing"/>
                    VaShare.Core
                </template>
                <MenuItem name="1-1">文章管理</MenuItem>
                <MenuItem name="1-2">评论管理</MenuItem>
                <MenuItem name="1-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Checkbox label="twitter">
                        <Icon type="ios-people"/>
                        用户管理
                    </Checkbox>

                </template>
                <MenuItem name="2-1">新增用户</MenuItem>
                <MenuItem name="2-2">活跃用户</MenuItem>
            </Submenu>
            <Submenu name="4">
                <template slot="title">
                    <Checkbox label="twitter">
                        <Icon type="ios-people"/>
                        vashare
                    </Checkbox>

                </template>
                <template v-for="sln in solutions">
                    <MenuItem :name="sln.index">{{sln.name}}</MenuItem>
                </template>

            </Submenu>
        </Menu>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  import cf from '../../util/build/codeConfig';


  export default {
    name: 'SolutionList',
    data() {
      return {
        solutionsList: [],
      };
    },
    computed: {
      ...mapState({ solutions: state => state.Build.solutions }),
    },
    methods: {
      ...mapActions(['someAsyncTask']),
      addSolution() {
        cf.add();
      },
    },
    created() {
      cf.load();
    },
  };
</script>

<style scoped>
    .bar {
        font-size: 20px;
        padding: 5px;
        text-align: right;
    }

    .bar i {
        cursor: pointer;
    }
</style>