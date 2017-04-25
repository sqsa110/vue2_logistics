<template>
  <header class="fd_header">

  </header>
</template>

<script>

  export default {
    name : 'app',
    data () {
      return {
        active : "login",
        title : ""
      }
    },
    methods : {
      go_recoverpw () {
        window.location.hash = '#/recoverpw';
        this.tiltle = '找回密码';
        this.active = 'recoverpw';
      }
    },
    createds () {
      console.log(this);

    },
    created (){


    },
    components : {}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "pc_header.styl";
</style>

