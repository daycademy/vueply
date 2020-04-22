import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import RouterViewWrapper from '../views/RouterViewWrapper.vue';
import Home from '../views/Home.vue';

import i18n from '../i18n';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:lang/:project?',
    component: RouterViewWrapper,
    beforeEnter(to: Route, _from: Route, next: Function) {
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
