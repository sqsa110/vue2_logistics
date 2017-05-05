<template>
  <fd_recoverpw @recoverpw_finish="finish" :loading="loading" ></fd_recoverpw>
</template>

<script>
  import fd_recoverpw  from '../../../components/recoverpw_main'
  import '../../../../static/js/lib/jQuery.md5';
  export default {
    name : 'recoverpw',
    data : () => {
      return {
        loading : false
      }
    },
    methods : {
      finish (data) {
        this.loading = true;
        setTimeout(function(){
          this.loading = false;
        }.bind(this),300)
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
      fd_recoverpw
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
