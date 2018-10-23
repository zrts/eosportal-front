import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './filters'
import i18n from './locales/index'
import Toasted from 'vue-toasted';

const ScatterJS = require('scatterjs-core');
const ScatterEOS = require('scatterjs-plugin-eosjs');
Vue.config.productionTip = false;

declare global {
  interface Window { scatter: any; }
}

const lang = store.state.language;
if (lang) {
  i18n.locale = lang;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

Vue.use(Toasted)

window.ScatterJS.plugins( new window.ScatterEOS() );
window.ScatterJS.scatter.connect("eosportal.io").then((connected: boolean) => {
  if(!connected) return false;
  store.dispatch('setScatter', window.ScatterJS.scatter);
  window.scatter = null;
  window.ScatterJS = null;
  window.ScatterEOS = null;
});
