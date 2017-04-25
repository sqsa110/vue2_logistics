<template>
  <div></div>
</template>

<script>
  import fd_login_main from '../../../components/login_main'
  import '../../../../static/js/lib/jQuery.md5';
  export default {
    name : 'login',
    data : () => {
      return {
        loading : false
      }
    },
    methods : {
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
