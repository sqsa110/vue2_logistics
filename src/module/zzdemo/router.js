import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter);

const UserHome = {template : '<div>Home</div>'}
const UserProfile = {template : '<div>Profile</div>'}
const UserPosts = {template:'<div>Posts</div>'}



let routers = new vueRouter({
  routes : [{
    path : '/',
    redirect : '/info'
  },{
    path : '/info/foo',
    component : (reslove) => require(['./router/info'],reslove),
    children : [
      {path:'',component:UserHome},
      {path:'profile',component:UserProfile},
      {path:'posts',component:UserPosts}
    ]

  },{
    path : '/index',
    component : (reslove) => require(['./router/index'],reslove)
  //  component : require('./index')
  }]
});


export default routers;

