import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/NetCoreBuild').default,
    }, {
      path: '/netcorebuild',
      name: 'netcorebuild',
      component: require('@/components/NetCoreBuild').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
