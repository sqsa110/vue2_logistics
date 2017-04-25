<template>
  <div>
    <form onsubmit="javascript:return false;" autocomplete="off">
      <div class="login_box">
        <div class="login_input_main">
          <div class="login_input fd_input finishInput">
            <el-input name="username" class="input_clear"></el-input>
            <el-input v-model="username.text" @blur="username_check" :autofocus="true" auto-complete="off" placeholder="请输入要回密码的用户名" name="username" v-bind:autofocus="true"></el-input>
            <div class="username_icon login_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghu"></use>
              </svg>
            </div>
          </div>
        </div>
        <el-alert
          title="成功提示的文案"
          type="success"
          :closable="false"
          v-show="username.successOff"
          show-icon>
        </el-alert>
        <el-alert
          :title="username.error_text"
          type="error"
          :closable="false"
          v-show="username.errorOff"
          show-icon>
        </el-alert>
      </div>
      <div class="login_box">
        <div class="login_input_main">

        </div>
      </div>
      <div class="login_box login_btn fd_fill_btn fd_success_btn">
        <el-button @click="finish"  :loading="loading">找回密码</el-button>
      </div>
    </form>
  </div>
</template>
<script>

  export default {
    name : 'recoverpw_main',
    props : {
      loading : {
        type : Boolean,
        default : false
      }
    },
    data () {
      return {
        login_code_off : true,
        username : {
          text : "",
          successOff : false,
          error_text : '',
          errorOff : false
        }
      }
    },
    methods : {
      finish (){
        let data = {
          username : this.username
        };
        this.$emit('recoverpw_finish',data);
      },
      username_check () {
        var username_text = this.username.text = this.username.text.trim();
        var username_lenth = 6;
        var username = this.username;

        if (!this.nameReg.test(username_text)) {
          username.errorOff = true;
          username.success = false;
          username.error_text = '请输入数字、字母、@、-、_、.字符'
        } else if (username.length > username_lenth) {
          username.errorOff = true;
          username.success = false;
          username.error_text = '用户名需大于6位'
        } else {
          username.errorOff = false;
          username.success = true;
          username.error_text = '';
        }
      }
    },

    mounted (el){
      var _this = this;
      $(this.$el).on('keydown','.finishInput' + ' input',function(ev){
        if (ev.keyCode == 13) {
          this.finish();
        }
      }.bind(this));
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "login_main.styl";
</style>

