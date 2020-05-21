import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import RouterViewWrapper from '../views/RouterViewWrapper.vue';
import Home from '../views/Home.vue';

import i18n from '../i18n';

Vue.use(VueRouter);

function createUUID(): string {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* eslint-disable-next-line */
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    /* eslint-disable-next-line */
    return (c === 'x' ? r :(r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const routes = [
  {
    path: '/:lang/:sessionId?/:project?',
    component: RouterViewWrapper,
    beforeEnter(to: Route, _from: Route, next: Function) {
      const { lang } = to.params;
      if (!['en', 'de'].includes(lang)) {
        return next('de');
      }

      if (i18n.locale !== lang) {
        i18n.locale = lang;
      }

      let { sessionId } = to.params;
      if (!sessionId) {
        sessionId = createUUID();
        return next(`${lang}/${sessionId}`);
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
