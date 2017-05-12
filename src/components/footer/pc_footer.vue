<!--
  版本  v0.0.1
  作者  李**
  作用  移动端底部导航栏
  说明  此组件使用淘宝图标库
        symbol引用方式

        淘宝图标链接
        http://www.iconfont.cn/plus/collections/index?spm=a313x.7781069.1998910419.3.2M07Q3

  api手册
    1.共4个按钮，slot名称分别为 fd_tooter_nav_序号 (1-4)
      实例
      <fd_footer>
        <div slot="fd_tooter_nav_1">我替换了第一个导航栏动作栏</div>
        <div slot="fd_tooter_nav_2">我替换了第二个导航栏动作栏</div>
        <div slot="fd_tooter_nav_3">我替换了第三个导航栏动作栏</div>
        <div slot="fd_tooter_nav_4">我替换了第四个导航栏动作栏</div>
      </fd_footer>

    2.可用slot名称fd_footer  替换整个fd_footer导航栏
      <fd_footer>
        <div slot="fd_footer">我替换了全部子元素</div>
      </fd_footer>

    3.参数表
      href_序号        点击跳转链接
      icon_off_序号    当前动作栏状态   默认是1
      icon_序号_1      设置当前动作栏1图标
      icon_序号_2      设置当前动作栏2图标
      name_序号        设置当前动作栏描述名称
      num_序号         设置数字标记
      <fd_footer href_1="/help.html" icon_off_1="1" icon_1_1="#icon-wenhao" icon_1_2="#icon-wenhao" name_1="帮助"></fd_footer>

   4.点击状态栏后回调事件
    icon_click_序号
-->

<template>
  <div class="fd_footers">
    <div class="fd_footer_fill">

    </div>
    <div class="fd_footer">

    </div>
  </div>
</template>

<script>

  export default {
    name : 'fd_footer',
    props : {

    },
    data : () => {
      return {
      }
    },
    methods : {
      icon_click_1 (){
        this.$emit('icon_click_1',false);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "pc_footer.styl"
</style>
