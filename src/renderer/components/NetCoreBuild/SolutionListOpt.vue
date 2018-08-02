<template>
    <div class="bar">
        <Icon type="md-add-circle" @click="addSolution()" title="add solution"/>
        <Icon type="md-remove-circle" @click="removeSolution()" title="remove solution"/>

        <Checkbox style="float:left"
                  :indeterminate="indeterminate"
                  :value="checkAll"
                  @click.prevent.native="handleCheckAll">select
        </Checkbox>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import cf from '../../util/build/codeConfig';

  export default {
    name: 'SolutionListOpt',
    data() {
      return {
        indeterminate: true,
        checkAll: false,
        solutionsList: [],
        checkedSolutions: [],
      };
    },
    watch: {
      solutions: function sl(v, oldv) {
        console.log(this.solutions.filter(item => item.checked));
        this.checkedSolutions = this.solutions.filter(item => item.checked).map(item => item.name);
        if (this.checkedSolutions.length === this.solutions.length && this.solutions.length > 0) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (this.checkedSolutions.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
    },
    computed: {
      ...mapState({ solutions: state => state.Build.solutions }),
    },
    methods: {
      addSolution() {
        cf.add();
      },
      removeSolution() {
        cf.remove(this.checkedSolutions);
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        cf.checkAll(this.checkAll);
      },
    },
  };
</script>

<style scoped>
    .bar {
        font-size: 20px;
        padding: 0 10px;
        text-align: right;
        color:#fff;
    }

    .bar i {
        cursor: pointer;
    }
    .bar i:hover {
        color:#2d8cf0;
    }
</style>