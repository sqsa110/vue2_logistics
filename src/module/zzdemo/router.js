import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter);
/*
let routers = new vueRouter({
  routes : [{
    path : '/',
    redirect : '/info'
  },{
    path : '/info',
    component : (reslove) => require(['./router/info'],reslove)
  },{
    path : '/index',
    component : (reslove) => require(['./router/index'],reslove)
  //  component : require('./index')
  }]
});
*/

let routers = new vueRouter({
  routes : []
});

export default routers;

