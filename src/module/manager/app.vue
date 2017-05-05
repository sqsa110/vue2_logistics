<template>
  <div>

    <fd_header
      @language_change="language_change"
      @region_change="region_change"
      :loginOff="loginOff"
      :name="name"
      :sectors="sectors"
      :imgsrc="imgsrc"
      :language_options="language_options"
      :region_options="region_options"
      :language_defalut="language_defalut"
      :region_defalut="region_defalut"
      :language_text="language_text"
      :region_text="region_text"
      :login_text="login_text"
      :register_text="register_text">
      {{ title }}
    </fd_header>
    <div class="middle">
      <div class="middle_main">
        <fd_left :nav_list="nav_list" @router_click="router_click"></fd_left>
        <div class="show_main">
          <router-view></router-view>
        </div>
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
  import fd_footer from '../../components/footer/pc_footer'

  var languageArr = [{value:"cn",label:'中文'},{value:"en",label:'英文'}];
  var regionArr = [{value:"cn",label:'中国'},{value:"en",label:'英国'},{value:"tw",label:"台湾"}];

  var arr = [];
  arr[0] = {title : '测试1',id : '',active : true, href:'javascript:;',childs : [
    {title : '测试1-1',id : 'test1' ,href:"#/test1",active : true},
    {title : '测试1-2',id : 'test2' ,href:"#/test2"},
    {title : '测试1-3',id : 'test3' ,href:"#/test3"},
    {title : '测试1-4',id : 'test4' ,href:"#/test4"},
  ]};
  arr[1] = {title : '测试2',href:'javascript:;',childs : [
    {title : '测试2-1',id : 'aaaaa' ,href:"#/aaaa"},
    {title : '测试2-2',id : 'bbbbb' ,href:"#/bbbb"},
    {title : '测试2-3',id : 'ccccc' ,href:"#/cccc"},
    {title : '测试2-4',id : 'ddddd' ,href:"#/dddd"},
  ]};
  arr[2] = {title : '测试3',href:'javascript:;',childs : []};

  export default {
    name : 'app',
    data () {
      return {
        active : "login",
        title : "",
        language_options : languageArr,
        region_options : regionArr,
        loginOff : true,
        name : '测试用户',
        sectors : '技术部',
        imgsrc : '/static/img/test/t1.jpg',
        language_defalut : 'cn',
        region_defalut : 'cn',
        language_text : '语言',
        region_text : '地区',
        register_text : '注册',
        login_text : '登陆',
        nav_list : arr
      }
    },
    methods : {
      go_recoverpw () {
        window.location.hash = '#/recoverpw';
        this.tiltle = '找回密码';
        this.active = 'recoverpw';
      },
      language_change (val){
        console.log(val)
        console.log('语言')
      },
      region_change (val){
        console.log(val);
        console.log('地区')
      },
      router_click (name){
        console.log(name);
        console.log('触发路由了')
      }
    },
    created (){
      //初始化data对应页面

      //beforeMount
    },
    components : {fd_header,fd_left,fd_footer}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "manager.styl";
</style>
