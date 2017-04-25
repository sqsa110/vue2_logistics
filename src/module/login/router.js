import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter);

let routers = new vueRouter({
  routes : [{
    path : '/',
    redirect : '/index'
  },{
    path : '/index',
    component : (reslove) => require(['./router/login'],reslove)
  },{
    path : '/register',
    component : (reslove) => require(['./router/register'],reslove)
  },{
    path : '/recoverpw',
    component : (reslove) => require(['./router/recoverpw'],reslove)
  }]
});

export default routers
