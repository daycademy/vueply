import Vue from 'vue';
import VueCirrus from 'vue-cirrus';
import App from './App.vue';
import router from './router';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'vue-cirrus/dist/vue-cirrus.css';

Vue.use(VueCirrus);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
