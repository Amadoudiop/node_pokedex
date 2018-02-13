// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import App from './App.vue';
import Pokemap from './components/Pokemap.vue';
import router from './router';
import bus from './bus';
import store from './store';
import vmodal from 'vue-js-modal';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(vmodal);

Vue.config.debug = true; Vue.config.devtools = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    bus,
    store,

  template: '<App/>',
  components: { App, Pokemap }
});
