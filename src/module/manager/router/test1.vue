<template>
  <div>
    <h1>12216516514563</h1>
    <fd_main>
      <div slot="main_header">
        <div>头部显示</div>
      </div>
      <div slot="data_main">
        <fd_table>
          <div>sldfkjlk</div>
        </fd_table>
      </div>
    </fd_main>
  </div>
</template>

<script>
  import fd_table from '../../../components/table/table'
  import fd_main from '../../../components/main/pc_main'

  export default {
    name : 'test1',
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
      fd_table,fd_main
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
