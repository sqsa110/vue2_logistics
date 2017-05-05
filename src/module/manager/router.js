import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter);

let routers = new vueRouter({
  routes : [{
    path : '/',
    redirect : '/test1'
  },{
    path : '/test1',
    component : (reslove) => require(['./router/test1'],reslove)
  },{
    path : '/test2',
    component : (reslove) => require(['./router/test2'],reslove)
  },{
    path : '/test3',
    component : (reslove) => require(['./router/test3'],reslove)
  },{
    path : '/test4',
    component : (reslove) => require(['./router/test4'],reslove)
  }]
});

export default routers
