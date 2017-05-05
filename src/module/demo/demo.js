//import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import ElementUI from 'element-ui'
 Vue.use(ElementUI);

import router from './router'


import App from './app'

new Vue({
  name : 'login_init',
  el : '#app',
  data : function(){
    return { visible: false }
  },
//  router,
  render : h => h(App),
  mounted(){
  },
  components : {}
});
