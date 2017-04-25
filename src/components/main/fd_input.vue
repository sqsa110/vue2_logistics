<template>
  <div class="el-input">
    <input :type="text" :name="" :placeholder="" :autocomplete="off" :class="" :id="" v-model="" />
  </div>
</template>
<script>
  export default {
    name : 'fd_input',
    data (){

    },
    props : {
      id : {
        type : String,
        default : ''
      },
      class : {
        type : String,
        default : ''
      },
      type : {
        type : String,
        default : 'text'
      },
      name : {
        type : String,
        default : ''
      },
      placeholder : {
        type : String,
        default : ''
      },
      autocomplete : {
        type : String,
        default : 'off'
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "main.style"
</style>

