import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
/*
import Info from '../../components/info'
*/
import App from './app'
require('assets/b.css')
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#info',
//  components: { App }
  render: h => h(App)
})
