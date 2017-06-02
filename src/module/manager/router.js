import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter);

let routers = new vueRouter({
  routes : [{
    path : '/',
    redirect : '/test1'
  },{
    path : '/test1/index',
    component : (reslove) => require(['./router/test1'],reslove),
    children : [
      {path : '',component : (reslove) => require(['./router/test1_0'],reslove)},
      {path : '1',component : (reslove) => require(['./router/test1_1'],reslove)},
      {path : '2',component : (reslove) => require(['./router/test1_2'],reslove)}
    ]
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
