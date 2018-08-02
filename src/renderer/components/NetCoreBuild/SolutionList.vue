<template>
    <div class="solutionlist">
        <div class="bar">
            <Icon type="md-add-circle" @click="addSolution()"/>
            <Icon type="md-remove-circle" @click="removeSolution()"/>

            <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选
            </Checkbox>
        </div>
        <CheckboxGroup v-model="checkedSolutions" @on-change="changeSelected">
            <Menu style="width: 100%;">
                <draggable v-model="solutionList" @end="orderSolutions">
                    <Submenu v-for="sln in solutionList" :key="sln.index" :name="sln.index"
                             style="border-bottom: 1px solid #e1e4e8">
                        <template slot="title">
                            <Checkbox :label="sln.name">
                                <span :title="sln.name">{{sln.name}}</span></Checkbox>
                        </template>
                        <MenuItem style="padding-left:20px" :name="sln.index+'-'+index"
                                  v-for="(proj,index) in sln.projects">{{proj.name}}
                        </MenuItem>
                    </Submenu>
                </draggable>
            </Menu>
        </CheckboxGroup>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import draggable from 'vuedraggable';
  import cf from '../../util/build/codeConfig';

  export default {
    name: 'SolutionList',
    data() {
      return {
        indeterminate: true,
        checkAll: false,
        solutionsList: [],
        checkedSolutions: [],
        solutionList: [],
        myArray: [],
      };
    },
    watch: {
      solutions: function sl(v, oldv) {
        console.log(this.solutions.filter(item => item.checked));
        this.checkedSolutions = this.solutions.filter(item => item.checked).map(item => item.name);
        this.solutionList = this.solutions;
      },
    },
    computed: {
      ...mapState({ solutions: state => state.Build.solutions }),
      // solutionList: {
      //   get() {
      //     return this.$store.state.Build.solutions;
      //   },
      //   set(value) {
      //     cf.order(value);
      //     // this.$store.dispatch('buildLoadSolution', value);
      //   },
      // },
    },
    methods: {
      addSolution() {
        cf.add();
      },
      removeSolution() {
        cf.remove(this.checkedSolutions);
      },
      orderSolutions() {
        cf.order(this.solutionList);
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
        } else {
          this.checkAllGroup = [];
        }
      },
      changeSelected(data) {
        cf.checked(data);
      },
    },
    mounted() {
      // cf.load();
    },
    components: {
      draggable,
    },
  };
</script>

<style>
    .solutionlist {

    }

    .solutionlist .bar {
        font-size: 20px;
        padding: 5px;
        text-align: right;
        height: 40px;
        border-bottom: 1px solid #e1e4e8;
    }

    .solutionlist .bar i {
        cursor: pointer;
    }

    .solutionlist .ivu-menu-submenu-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .solutionlist .ivu-menu-submenu-title-icon {
        position: absolute;
        top: 10px;
        right: 0;
        display: none;
    }

    .solutionlist .ivu-menu-item, .solutionlist .ivu-menu-submenu-title {
        padding: 5px 10px;
    }

    .ivu-menu-vertical.ivu-menu-light:after {
        width: 0;
    }
</style>