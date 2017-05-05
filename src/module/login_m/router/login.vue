<template>
  <fd_login_main @login_finish="login_finish" :loading="loading" ></fd_login_main>
</template>

<script>
  import fd_login_main from '../../../components/login_main'
  import '../../../../static/js/lib/jQuery.md5';
  var user_arr_test = [{
    "user" : "aaaaaaa",
    "passwd" : $.md5("aaaaaa6")
  }];
  export default {
    name : 'login',
    data : () => {
      return {
        loading : false
      }
    },
    methods : {
      login_finish (data) {
        this.loading = true;
        setTimeout(function(){

          if (data.username.success && data.passwd.success && data.code.success) {
            let off = false;

            for (let i=0,maxi=user_arr_test.length;i<maxi;i++) {
              if (user_arr_test[i].user == data.username.text && user_arr_test[i].passwd == $.md5(data.passwd.text)) {
                off = true;
                break;
              }
            }
            if (off) {
              alert('登录成功！');
            }
          } else {
            this.show_warn_message('有内容输入不正确,请检查!');
          }
          this.loading = false;
        }.bind(this),300);
      },
      show_warn_message (text){
        this.$message({
          showClose: true,
          message: text,
          type: 'warning'
        });
      }
    },
    events : {
    },
    mounted (el){

    },
    components : {
      fd_login_main
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
<style scoped>

</style>


<style lang="stylus" rel="stylesheet/stylus">
  @import "login.styl";
</style>
-->
