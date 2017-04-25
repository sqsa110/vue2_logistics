import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter);

let routers = new vueRouter({
  routes : [{
    path : '/',
    redirect : '/info'
  },{
    path : '/info',
    component : (reslove) => require(['./info'],reslove)
  },{
    path : '/index',
    component : (reslove) => require(['./index'],reslove)
  //  component : require('./index')
  }]
});

export default routers;

