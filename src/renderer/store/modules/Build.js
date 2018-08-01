const state = {
  solutions: [],
  logs: [],
};

const mutations = {
  ADD_SOLUTION(state, solution) {
    console.log('add solution');
    state.solutions.push(Object.assign({}, solution));
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
    context.commit('LOAD_SOLUTIONS', solutionList);
  },
};

export default {
  state,
  mutations,
  actions,
};
