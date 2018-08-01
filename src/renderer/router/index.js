import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    }, {
      path: '/netcorebuild',
      name: 'netcorebuild',
      component: require('@/components/NetCoreBuild').default,
    }, {
      path: '/solution',
      name: 'solution',
      component: require('@/components/SolutionAnalyse').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
