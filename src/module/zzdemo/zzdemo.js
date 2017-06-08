//import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import App from './app'
import store from '../../vuex/zzdemo/store'

Vue.use(ElementUI);

new Vue({
  name : 'zzdemo',
  el : '#app',
  store,
  router,
  render : h => h(App)
});
