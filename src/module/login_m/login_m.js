import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import router from './router'
import App from './app'

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  name : 'login_init',
  el : '#app',
  router,
  render : h => h(App),
  mounted(){
  }
});
