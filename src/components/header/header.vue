<!--
  版本  v0.0.1
  作者  李**
  作用  移动端顶部状态栏
  说明  此组件使用淘宝图标库
        symbol引用方式

        淘宝图标链接
        http://www.iconfont.cn/plus/collections/index?spm=a313x.7781069.1998910419.3.2M07Q3

  api手册
    1.共3个按钮，slot名称分别为 goback,title,gohome
      实例
      <fd_header>
        <div slot="goback">我替换了返回按钮</div>
        <div slot="title">我替换了标题栏</div>
        <div slot="gohome">我替换了主页按钮</div>
      </fd_header>

    2.参数表
      title        标题栏文本
      homeurl      主页按钮链接url
      icon_goback  返回按钮图标
      icon_gohome  主页按钮图标
      <fd_header homeurl="/help.html" title="登录"></fd_footer>

   3.点击状态栏后回调事件
    icon_click_序号
-->

<template>
  <div id="fd_header">
    <slot name="goback">
      <div class="goback">
        <a @click="goback" href="javascript:history.back();">
          <slot name="goback_icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="icon_goback"></use>
            </svg>
          </slot>
        </a>
      </div>
    </slot>
    <slot name="title">
      <h2 class="header_title"><slot>{{ title }}</slot></h2>
    </slot>
    <slot name="gohome">
      <div class="gohome">
        <a @click="gohome" :href="homeurl">
          <slot name="gohome_icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="icon_gohome"></use>
            </svg>
          </slot>
        </a>
      </div>
    </slot>
  </div>
</template>

<script>
//  import '../../../static/font/iconfont.js'
  export default {
    name : 'login',
    props : {
      title : {
        type : String,
        default : '这里是标题'
      },
      homeurl : {
        type : String,
        default : './index.html'
      },
      icon_goback : {
        type : String,
        default : '#icon-fanhui'
      },
      icon_gohome : {
        type : String,
        default : '#icon-shouye1'
      }
    },
    data : () => {
      return {
      }
    },
    methods : {
      goback (){
        this.$emit('goback',false);
        history.back();
      },
      gohome (){
        this.$emit('gohome',false);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "header.styl"
</style>
