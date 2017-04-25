<template>
  <div id="login">
  <!--  <el-button @click="visible = true">按钮</el-button>   -->
    <ul>
      <li><router-link to="/info">Info</router-link></li>
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
        visible:false
      }
    },
    components : {}   //components
  }
</script>
<style>

</style>
