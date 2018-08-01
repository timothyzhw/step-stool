const state = {
  solutions: [],
  logs: [],
};

const mutations = {
  ADD_SOLUTION(state, solution) {
    state.solutions.push(solution);
  },

  LOAD_SOLUTIONS(state, solutionList) {
    if (solutionList && Array.isArray(solutionList)) {
      state.solutions = solutionList;
    }
  },
};

const actions = {
  buildAddSolution(context, solution) {
    console.log(solution);
    context.commit('ADD_SOLUTION', solution);
  },

  buildLoadSolution(context, solutionList) {
    console.log('test');
    context.commit('LOAD_SOLUTIONS', solutionList);
  },
};

export default {
  state,
  mutations,
  actions,
};
