import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterView from '../views/RouterView.vue';
import Home from '../views/Home.vue';

import i18n from '../i18n';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:lang',
    component: RouterView,
    beforeEnter(to: any, _from: any, next: any) {
      const { lang } = to.params;
      if (!['en', 'de'].includes(lang)) {
        return next('de');
      }

      if (i18n.locale !== lang) {
        i18n.locale = lang;
      }
      return next();
    },
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '*',
    redirect: '/de',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
