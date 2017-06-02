//import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import App from './app'

Vue.use(ElementUI);

new Vue({
  name : 'routerdemo',
  el : '#app',
  router,
  render : h => h(App)
});
