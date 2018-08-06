import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'netcore-build',
      component: require('@/components/NetCoreBuild').default,
    }, {
      path: '/setting',
      name: 'setting',
      component: require('@/components/GlobalSetting').default,
    },
    {
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
