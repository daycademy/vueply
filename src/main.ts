import Vue from 'vue';
import VueCirrus from 'vue-cirrus';
import VueI18n from 'vue-i18n';
import store from './store';
import App from './App.vue';
import router from './router';
import messages from './lang';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/vue/vue';
import 'codemirror/addon/scroll/simplescrollbars';
import 'vue-cirrus/dist/vue-cirrus.css';

Vue.use(VueCirrus);

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
