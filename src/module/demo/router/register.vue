<template>
  <fd_register_main @register_finish="register_finish" :loading="loading"></fd_register_main>
</template>
<script>
  import fd_register_main from '../../../components/register_main'
  export default {
    name : 'fd_register',
    data (){
      return {
        loading : false
      }
    },
    methods : {
      register_finish (data) {
        this.loading = true;
        setTimeout(function(){
          if (data.username.success && data.passwd.success && data.code.success) {
            alert('注册成功！');
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
    components : {
      fd_register_main
    }
  }
</script>
<!--
<style lang="stylus" rel="stylesheet/stylus">
  @import "login.styl";
</style>
-->
