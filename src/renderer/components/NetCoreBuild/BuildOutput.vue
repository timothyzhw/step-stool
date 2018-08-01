<template>
    <div class="output">
        <div class="bar">
            <Button>编译</Button>
        </div>
        <div>
            <div v-for="log in logs">
                <pre v-if="log.indexOf('Error')>0 || log.indexOf('error')>0" style="color: red;">{{log}}</pre>
                <pre v-else>{{log}}</pre>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import cf from '../../util/build/codeConfig';

  export default {
    name: 'SolutionList',
    data() {
      return {
        indeterminate: true,
        checkAll: false,
        solutionsList: [],
        checkSolutions: [],
      };
    },
    computed: {
      ...mapState({
        solutions: state => state.Build.solutions,
        logs: state => state.Build.logs,
      }),
    },
    methods: {
      addSolution() {
        cf.add();
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
    },
    created() {
      // cf.load();
    },
  };
</script>

<style>

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

</style>