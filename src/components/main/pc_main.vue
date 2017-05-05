<template>
  <div class="fd_main">
    <slot name="fd_main">
      <div class="main_header">
        <slot name="main_header"></slot>
      </div>
      <div class="showdata_main">
        <slot name="data_main"></slot>
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    name : 'fd_pc_main',
    data (){
      return {
        aaa : '123'
      }
    },
    props : {
      id : {
        type : String,
        default : ''
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "pc_main.styl"
</style>

