import Vue from 'vue';
import VueCirrus from 'vue-cirrus';
import store from './store';
import App from './App.vue';
import router from './router';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/vue/vue';
import 'codemirror/addon/scroll/simplescrollbars';
import 'vue-cirrus/dist/vue-cirrus.css';

Vue.use(VueCirrus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
