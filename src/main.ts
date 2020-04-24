import Vue from 'vue';
import VueCirrus from 'vue-cirrus';
import store from './store';
import App from './App.vue';
import i18n from './i18n';
import router from './router';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/vue/vue';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'vue-cirrus/dist/vue-cirrus.css';

Vue.use(VueCirrus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
