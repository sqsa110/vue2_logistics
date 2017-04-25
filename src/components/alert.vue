<!--
  版本  v0.0.1
  作者  李**
  作用  alert自定义弹窗
  说明

  api手册
    1.共3个插槽，slot名称分别为 alert_title,alert_btns和默认

      实例
      <fd_alert>
        <div slot="alert_title">我替换了标题栏</div>
        <div>我替换了弹窗主体</div>
        <div slot="alert_btns">我替换了按钮组</div>
      </fd_alert>

    2.参数表
      showOff       弹窗显示开关  默认false
      mask_off      遮着层开关    默认true
      btnsOff       按钮组开关    默认true
      cancelOff     取消按钮开关  默认false
      finishOff     完成按钮开关  默认true
      maskClickOff  遮着层按钮取消开关 默认true
      title         标题文本
      cancelTitle   取消按钮文本  默认为取消
      finishTitle   完成按钮文本  默认为确认

   3.点击状态栏后回调事件
      取消按钮回调事件  alert_cancel
      完成按钮回调事件  alert_finish

-->

<template>
  <div>
    <transition name="fade">
      <div class="fd_alert" v-if="showOff">
        <div class="alert_mask" @click="cancelAction(false)" v-show="mask_off">
        </div>
        <div class="alert_from" @click="cancelAction(false)">
          <div class="alert_main" @click.stop>
            <div class="alert_title_box el-message-box__header">
              <slot name="alert_title">
                <div class="el-message-box__title"> {{ title }} </div>
                <i class="alert_icon_close el-message-box__close el-icon-close" @click=""></i>
              </slot>
            </div>
            <div class="alert_box">
              <slot>
                <p>这里是默认文本</p>
              </slot>
            </div>
            <div class="el-message-box__btns" v-show="btnsOff">
              <slot name="alert_btns">
                <el-button v-if="cancelOff" @click="cancelAction(false)">{{ cancelTitle }}</el-button>
                <el-button v-if="finishOff" type="primary" :class="[cancelOff ? '' : 'block_btn']" @click="finishAction" :loading="loadingOff">{{ finishTitle }}</el-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name : 'login',
    props : {
      title : {
        type : String,
        default : '这里是标题'
      },
      cancelOff : {
        type : Boolean,
        default : false
      },
      cancelTitle : {
        type : String,
        default : '取消'
      },
      finishOff : {
        type : Boolean,
        default : true
      },
      finishTitle : {
        type : String,
        default : '确认'
      },
      btnsOff : {
        type : Boolean,
        default : true
      },
      maskClickOff : {
        type : Boolean,
        default : true,
      },
      showOff : {
        type : Boolean,
        default : false
      },
      mask_off : {
        type : Boolean,
        default : true
      }
    },
    data : () => {
      return {
        loadingOff : false,
      }
    },
    methods : {
      cancelAction (){
        this.$emit('alert_cancel',false);
      },
      finishAction (){
        this.$emit('alert_finish',false);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "alert.styl"
</style>
<!--
<style scoped>
  .alert_mask {
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:.5;
    background:#000;
  }
  .alert_from {
    position : fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    text-align:center;
  }
  .alert_from:after {
    content : '';
    display : inline-block;
    height:100%;
    width:0;
    vertical-align:middle;
  }
  .alert_main {
    text-align:left;
    display:inline-block;
    vertical-align:middle;
    background-color:#fff;
    width:420px;
    border-radius:3px;
    font-size:16px;
    padding:0 20px 20px;
    overflow:hidden;
    -webkit-backface-visibility:hidden;
    backface-visibility:hidden;
    border-radius:10px;
  }
  .alert_box {
    padding:20px 20px 0;
  }

</style>
-->
