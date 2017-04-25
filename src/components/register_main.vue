<template>
  <div>
    <form onsubmit="javascript:return false;" autocomplete="off">
      <div class="login_box">
        <div class="login_input_main">
          <div class="login_input fd_input">
            <el-input name="username" class="input_clear"></el-input>
            <el-input v-model="username.text" @blur="username_check" :autofocus="true" auto-complete="off" placeholder="请输入用户名" v-bind:id="username.title" name="username" v-bind:autofocus="true"></el-input>
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
          <div class="login_input finishInput fd_input">
            <el-input type="password" name="passwd" class="input_clear"></el-input>
            <el-input type="password" @blur="passwd_check" auto-complete="new-password" v-model="passwd.text" placeholder="请输入密码" name="passwd"></el-input>
            <div class="password_icon login_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-suo"></use>
              </svg>
            </div>
          </div>
        </div>
        <el-alert
          title="成功提示的文案"
          type="success"
          :closable="false"
          v-show="passwd.successOff"
          show-icon>
        </el-alert>
        <el-alert
          :title="passwd.error_text"
          type="error"
          :closable="false"
          v-show="passwd.errorOff"
          show-icon>
        </el-alert>
      </div>
      <div class="login_box">
        <div class="login_input_main">
          <div class="login_input finishInput fd_input">
            <el-input type="password" name="passwd2" class="input_clear"></el-input>
            <el-input type="password" @blur="passwd2_check" auto-complete="new-password" v-model="passwd2.text" placeholder="请在输入密码" name="passwd2"></el-input>
            <div class="password_icon login_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-suo"></use>
              </svg>
            </div>
          </div>
        </div>
        <el-alert
          title="成功提示的文案"
          type="success"
          :closable="false"
          v-show="passwd.successOff"
          show-icon>
        </el-alert>
        <el-alert
          :title="passwd2.error_text"
          type="error"
          :closable="false"
          v-show="passwd2.errorOff"
          show-icon>
        </el-alert>
      </div>
      <div class="login_code" v-if="login_code_off">
        <h5 class="login_main_title login_code_main">
          <a href="javascript:;" @click="code_refresh">
            <img class="login_code_img" src="/static/img/login/code.jpg" alt="验证码" />
          </a>
        </h5>
        <div class="login_code_input finishInput login_input fd_input">
          <el-input type="text" @blur="code_check" auto-complete="off" v-model="code.text" placeholder="请输入验证码" v-bind:id="code.title" name="login_code"></el-input>
        </div>
        <el-alert
          title="成功提示的文案"
          type="success"
          :closable="false"
          v-show="code.successOff"
          show-icon>
        </el-alert>
        <el-alert
          :title="code.error_text"
          type="error"
          :closable="false"
          v-show="code.errorOff"
          show-icon>
        </el-alert>
      </div>
      <div class="login_box login_btn fd_fill_btn fd_success_btn">
        <el-button @click="finish" :loading="loading">注册</el-button>
      </div>
    </form>
  </div>
</template>
<script>

  export default {
    name : 'login_main',
    props : {
      loading : {
        type : Boolean,
        default : false
      },
      nameReg : {
        type : RegExp,
        default : function(){
          return /^[a-zA-Z0-9]+[\w\@\-\.]{0,}$/
        }
      },
      passwdReg : {
        type : RegExp,
        default : function(){
          return /^(?![0-9]+$)(?![a-zA-Z]+$)[^\ ]{6,}$/
        }
      },
      codeReg : {
        type : RegExp,
        default : function(){
          return /^[0-9]{4}$/
        }
      }
    },
    data () {
      return {
        username : {
          text : '',
          title : 'username',     //id值
          successOff : false,     //successOff提示框显示开关
          errorOff : false,       //errorOff提示框显示开关
          error_text : '',        //错误提示框文本
          success : false         //用户名验证是否通过
        },
        passwd : {
          text : '',
          title : 'passwd',
          successOff : false,
          errorOff : false,
          error_text : '',
          success : false
        },
        passwd2 : {
          text : '',
          title : 'passwd2',
          successOff : false,
          errorOff : false,
          error_text : '',
          success : false
        },
        login_code_off : true,
        code : {
          text : '',
          title : 'code',
          successOff : false,
          errorOff : false,
          error_text : '',
          success : false
        },
      }
    },
    methods : {
      code_refresh (){
        this.$emit('code_refresh');
      },
      finish (){
        let data = {
          username : this.username,
          passwd : this.passwd,
          code : this.code
        };
        if (!this.login_code_off) {
          data.code.success = true;
        }
        this.$emit('register_finish',data);
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
      },
      passwd_check () {

        var passwd_text = this.passwd.text = this.passwd.text.trim();
        var passwd = this.passwd;

        if (!this.passwdReg.test(passwd_text)) {
          passwd.errorOff = true;
          passwd.success = false;
          passwd.error_text = "请输入6位以上的非空字符";
        } else {
          passwd.errOff = false;
          passwd.success = true;
          passwd.error_text = "";
        }

        if (this.passwd2.text != '' && this.passwd2.text === this.passwd.text ) {
          passwd2.errOff = false;
          passwd2.success = true;
          passwd2.error_text = "";
        }
      },
      passwd2_check () {
        var passwd2_text = this.passwd2.text = this.passwd2.text.trim();
        var passwd2 = this.passwd2;
        var passwd_text = this.passwd.text;

        if (passwd_text !== passwd2_text ) {
          passwd2.errorOff = true;
          passwd2.success = false;
          passwd2.error_text = "两次输入的密码不一致";
        } else {
          passwd2.errOff = false;
          passwd2.success = true;
          passwd2.error_text = "";
        }
      },
      code_check () {
        if (!this.login_code_off) {
          return true;
        }
        let text = this.code.text = this.code.text.trim();
        let code = this.code;
        if (!this.codeReg.test(text)) {
          code.errorOff = true;
          code.success = false;
          code.error_text = "请输入4位数字验证码";
        } else {
          code.errOff = false;
          code.success = true;
          code.error_text = "";
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
  @import "register_main.styl";
</style>

