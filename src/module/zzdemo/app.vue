<template>
  <div id="routerdemo">
  <!--  <el-button @click="visible = true">按钮</el-button>   -->
    <ul>
      <li><router-link to="/info">Info</router-link></li>
      <li><router-link to="/info/foo">/info/foo</router-link></li>
      <li><router-link to="/info/foo/profile">/info/foo/profile</router-link></li>
      <li><router-link to="/info/foo/posts">/info/foo/posts</router-link></li>
      <li><router-link to="/index">Index</router-link></li>
      <li><a href="#/info">Info自定义</a></li>
      <li><a href="#/index">Index自定义</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name : 'app',
    data () {
      return {
      }
    },
    components : {}   //components
  }
</script>
