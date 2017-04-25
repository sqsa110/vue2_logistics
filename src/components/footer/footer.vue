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
  <div id="fd_footer">
    <slot name="fd_footer">
      <ul class="fd_footer_nav_main">
        <li>
          <a :href="href_1" @click="icon_click_1" :class="[icon_off_1 == 2 ? 'active' : '']">
            <slot name="fd_footer_nav_1">
              <div class="fd_footer_nav_box">
                <div class="fd_footer_nav_icon">
                  <svg class="icon" aria-hidden="true">
                    <use v-if="icon_off_1 == 1" :xlink:href="icon_1_1"></use>
                    <use v-if="icon_off_1 == 2" :xlink:href="icon_1_2"></use>
                  </svg>
                </div>
                <p class="fd_footer_nav_text">
                  {{ name_1 }}
                </p>
                <div v-show="num_1 > 0" class="fd_footer_nav_num"><strong>{{ num_1 }}</strong></div>
              </div>
            </slot>
          </a>
        </li>
        <li>
          <a :href="href_2" @click="icon_click_2" :class="[icon_off_2 == 2 ? 'active' : '']">
            <slot name="fd_footer_nav_2">
              <div class="fd_footer_nav_box">
                <div class="fd_footer_nav_icon">
                  <svg class="icon" aria-hidden="true">
                    <use v-if="icon_off_2 == 1" :xlink:href="icon_2_1"></use>
                    <use v-if="icon_off_2 == 2" :xlink:href="icon_2_2"></use>
                  </svg>
                </div>
                <p class="fd_footer_nav_text">
                  {{ name_2 }}
                </p>
                <div v-show="num_2 > 0" class="fd_footer_nav_num"><strong>{{ num_2 }}</strong></div>
              </div>
            </slot>
          </a>
        </li>
        <li>
          <a :href="href_3" @click="icon_click_3" :class="[icon_off_3 == 2 ? 'active' : '']">
            <slot name="fd_footer_nav_3">
              <div class="fd_footer_nav_box">
                <div class="fd_footer_nav_icon">
                  <svg class="icon" aria-hidden="true">
                    <use v-if="icon_off_3 == 1" :xlink:href="icon_3_1"></use>
                    <use v-if="icon_off_3 == 2" :xlink:href="icon_3_2"></use>
                  </svg>
                </div>
                <p class="fd_footer_nav_text">
                  {{ name_3 }}
                </p>
                <div v-show="num_3 > 0" class="fd_footer_nav_num"><strong>{{ num_3 }}</strong></div>
              </div>
            </slot>
          </a>
        </li>
        <li>
          <a :href="href_4" @click="icon_click_4" :class="[icon_off_4 == 2 ? 'active' : '']">
            <slot name="fd_footer_nav_4">
              <div class="fd_footer_nav_box">
                <div class="fd_footer_nav_icon">
                  <svg class="icon" aria-hidden="true">
                    <use v-if="icon_off_4 == 1" :xlink:href="icon_4_1"></use>
                    <use v-if="icon_off_4 == 2" :xlink:href="icon_4_2"></use>
                  </svg>
                </div>
                <p class="fd_footer_nav_text">
                  {{ name_4 }}
                </p>
                <div v-show="num_4 > 0" class="fd_footer_nav_num"><strong>{{ num_4 }}</strong></div>
              </div>
            </slot>
          </a>
        </li>
      </ul>
      <footer class="fd_footer_fill"></footer>
    </slot>
  </div>
</template>

<script>

  export default {
    name : 'fd_footer',
    props : {
      icon_off_1 : {
        type : String,
        default : "1"
      },
      icon_off_2 : {
        type : String,
        default : "1"
      },
      icon_off_3 : {
        type : String,
        default : "1"
      },
      icon_off_4 : {
        type : String,
        default : "1"
      },
      name_1 : {
        type : String,
        default : '首页'
      },
      name_2 : {
        type : String,
        default : '购物'
      },
      name_3 : {
        type : String,
        default : '资料'
      },
      name_4 : {
        type : String,
        default : '功能'
      },
      icon_1_1 : {
        type : String,
        default : '#icon-shouye'
      },
      icon_1_2 : {
        type : String,
        default : '#icon-shouye'
      },
      icon_2_1 : {
        type : String,
        default : '#icon-gouwuche'
      },
      icon_2_2 : {
        type : String,
        default : '#icon-gouwuchefill'
      },
      icon_3_1 : {
        type : String,
        default : '#icon-geren'
      },
      icon_3_2 : {
        type : String,
        default : '#icon-geren2'
      },
      icon_4_1 : {
        type : String,
        default : '#icon-all'
      },
      icon_4_2 : {
        type : String,
        default : '#icon-yingyongzhongxin'
      },
      href_1 : {
        type : String,
        default : './index.html'
      },
      href_2 : {
        type : String,
        default : './shopping_cat.html'
      },
      href_3 : {
        type : String,
        default : './userinfo.html'
      },
      href_4 : {
        type : String,
        default : './nav.html'
      },
      num_1 : {
        "type" : String,
        "default" : '0'
      },
      num_2 : {
        "type" : String,
        "default" : '0'
      },
      num_3 : {
        "type" : String,
        "default" : '0'
      },
      num_4 : {
        "type" : String,
        "default" : '0'
      }
    },
    data : () => {
      return {
      }
    },
    methods : {
      icon_click_1 (){
        this.$emit('icon_click_1',false);
      },
      icon_click_2 (){
        this.$emit('icon_click_2',false);
      },
      icon_click_3 (){
        this.$emit('icon_click_3',false);
      },
      icon_click_4 (){
        this.$emit('icon_click_4',false);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "footer.styl"
</style>
