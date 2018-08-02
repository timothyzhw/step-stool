const state = {
  solutions: [],
  selectedSolutions: [],
  logs: [],
};

const mutations = {
  ADD_SOLUTION(state, solution) {
    state.solutions.push(Object.assign({}, solution));
  },

  LOAD_SOLUTIONS(state, solutionList) {
    if (solutionList && Array.isArray(solutionList)) {
      state.solutions = solutionList;
    }
  },

  ADD_LOG(state, log) {
    if (log.log) {
      state.logs.push(log.log);
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

  buildAddLog(context, { log }) {
    context.commit('ADD_LOG', { log });
  },
};

export default {
  state,
  mutations,
  actions,
};
