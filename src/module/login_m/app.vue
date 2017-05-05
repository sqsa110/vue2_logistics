<template>
  <div id="login">

    <fd_header>{{ title }}</fd_header>

    <div class="login">
      <div class="login_main">
        <div slot="alert_title" class="login_title_main" v-show='active != "recoverpw"'>
          <a href="#/index" @click="setActive('login')" class="login_title_name login_title_login" :class="[ active == 'login' ? 'active' : '' ]"> 登陆 </a>
          <a href="#/register" @click="setActive('register')" class="login_title_name login_title_register" :class="[ active == 'register' ? 'active' : '' ]"> 注册 </a>
        </div>
        <div class="login_userinfo_main">
          <router-view></router-view>
          <div class="login_box login_find fd_button_text" v-show="active === 'login'">
            <el-button @click="go_recoverpw" type="text">忘记密码</el-button>
          </div>
        </div>
      </div>
    </div>

    <fd_footer icon_off_3="2"></fd_footer>
  </div>
</template>

<script>
  import '../../../static/js/util/fd_tools'
  import fd_header from '../../components/header/header'
  import fd_footer from '../../components/footer/footer'

  export default {
    name : 'app',
    data () {
      return {
        active : "login",
        title : '登录'
      }
    },
    methods : {
      setActive (name) {

        switch (name) {
          case 'login':
            this.title = '登录';
            this._data.active = "login";
            break;
          case 'register':
            this.title = '注册';
            this._data.active = name;
            break;
          case 'recoverpw':
            this.title = '找回密码';
            this._data.active = name;
            break;
          default :
            this.title = '登录';
            this._data.active = "login";
        }
      },
      go_recoverpw () {
        window.location.hash = '#/recoverpw';
        this.tiltle = '找回密码';
        this.active = 'recoverpw';
      }
    },
    createds () {
      console.log(this);
      //beforeMount
    },
    created (){
      //初始化data对应页面
      var name = $.getVueRouteName();
      this.setActive(name);
      /*
      if (name == 'register') {
        //设置注册按钮为active
        this._data.active = 'register';
        this.title = '登录'
      } if (name == 'recoverpw') {
        this._data.active = 'recoverpw';
        this.title = '注册';
      } else {
        //默认设置登录为active
        this._data.active = 'login';
        this.title = '找回密码';
      }
      */

    },
    components : {fd_header,fd_footer}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "login.styl";
</style>
