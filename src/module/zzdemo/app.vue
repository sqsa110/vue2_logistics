<template>
  <div id="routerdemo">
  <!--  <el-button @click="visible = true">按钮</el-button>   -->
    <ul>
      <li><router-link to="/info">Info</router-link></li>
      <li><router-link to="/info/foo">/info/foo</router-link></li>
      <li><router-link to="/info/foo/profile">/info/foo/profile</router-link></li>
      <li><router-link to="/info/foo/posts">/info/foo/posts</router-link></li>
      <li><router-link to="/index">Index</router-link></li>
      <li><a href="#/info">Info自定义</a></li>
      <li><a href="#/index">Index自定义</a></li>
    </ul>
    <div class="form-group">
      <label class="col-sm-2 control-label">用户名</label>
      <div class="col-sm-10">
        <input type="text" v-model="message" class="form-control" placeholder="username">
      </div>
    </div>
    <div>
      {{message}}
      {{$store.state.user_name}}
    </div>
    <div class="form-group">
      <div class="col-sm-10 col-sm-offset-2">
        <button type="button" @click="submit" class="btn btn-default">提交</button>
        <button type="button" @click="submitInit" class="btn btn-default">初始化</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

  export default {
    name : 'app',
    data () {
      return {
        username : ''
      }
    },
    computed : {
      ...mapGetters({
        getUserName : 'getUserName',
        getLoading : 'getLoading',
        getLeftNavState : 'getLeftNavState'
      }),
      message : {
        get () {
          return this.getUserName;
        },
        set (value) {
          this.$store.dispatch('changeUserNameState',value);
        }
      }
    },
    methods : {
      submit(){
      //  this.$store.commit("showUserName");
     //   this.$store.commit('getUserName');
        console.log(this.getUserName);
      },
      submitInit () {
        this.username = '';
        this.$store.dispatch('userNameInitState')
      },
      userNameChange(){
      //  this.$store.state.user_name = this.username;
        this.$store.dispatch('changeUserNameState',this.username);

      }
    },
    components : {}   //components
  }
</script>
