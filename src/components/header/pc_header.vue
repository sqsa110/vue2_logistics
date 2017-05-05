<template>
  <header class="fd_header">
    <div  v-if="loginOff" class="userinfo">
      <div class="userinfo_img_main">
        <img class="userinfo_img" :src="imgsrc" alt="头像" />
      </div>
      <h1 class="userinfo_text">
        <p class="userinfo_name">{{ name }}</p>
        <p class="userinfo_sectors">{{ sectors }}</p>
      </h1>
    </div>
    <div v-else class="loginBtn">
      <el-button @click="login" type="text">{{login_text}}</el-button>
      <el-button @click="register" type="text">{{register_text}}</el-button>
    </div>
    <div class="select_main language_main">
      <h5>{{language_text}}</h5>
      <el-select v-model="language_value" @change="language_change" placeholder="请选择">
        <el-option
          v-for="item in language_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="select_main region_main">
      <h5>{{region_text}}</h5>
      <el-select v-model="region_value" @change="region_change" placeholder="请选择">
        <el-option
          v-for="item in region_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </header>
</template>

<script>

  export default {
    name : 'app',
    props : {
      loginOff : {
        type : Boolean,
        default : false
      },
      name : {
        type : String,
        default : '测试用户'
      },
      sectors : {
        type : String,
        default : '技术部'
      },
      imgsrc : {
        type : String,
        default : '/static/img/test/t1.jpg'
      },
      language_options : {
        type : Array,
        defalut : []
      },
      region_options : {
        type : Array,
        defalut : []
      },
      language_text : {
        type : String,
        defalut : ''
      },
      region_text : {
        type : String,
        defalut : ''
      },
      login_text : {
        type : String,
        defalut : '登陆'
      },
      register_text : {
        type : String,
        defalut : '注册'
      },
      language_defalut : {
        type : String,
        defalut : ''
      },
      region_defalut : {
        type : String,
        defalut : ''
      }
    },
    data () {
      return {
        language_value : this.language_defalut,
        region_value : this.region_defalut,
      }
    },
    methods : {
      login (){
        window.location.href = window.location.origin + '/module/login.html';
      },
      register (){
        window.location.href = window.location.origin + '/module/login.html#/register';
      },
      language_change (val){
        this.$emit('language_change',val)
      },
      region_change (val){
        this.$emit('region_change',val);
      }
    },
    created (){

    },
    components : {}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "pc_header.styl";
</style>

