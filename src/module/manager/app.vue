<template>
  <div>

    <fd_header>{{ title }}</fd_header>
    <div class="middle">
      <div class="middle_main">
        <fd_left></fd_left>
        <fd_main>
          <router-view></router-view>
        </fd_main>
      </div>
    </div>
    <fd_footer></fd_footer>
    <!--
    <fd_footer icon_off_3="2"></fd_footer>
    -->
  </div>
</template>

<script>
  import '../../../static/js/util/fd_tools'
  import fd_header from '../../components/header/pc_header'
  import fd_left from '../../components/left/pc_left'
  import fd_main from '../../components/main/pc_main'
  import fd_footer from '../../components/footer/pc_footer'

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
      //初始化data对应页面

      //beforeMount
    },
    components : {fd_header,fd_left,fd_main,fd_footer}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "manager.styl";
</style>
