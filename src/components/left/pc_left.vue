<template>
  <div class="fd_left">
    <ul>
      <li v-for="item in listArr">
        <a href="javascript:;" class="left_nav_btn"  :class="[item.active?'active' : '']">
          <div class="icon" :class="[item.active?'rotate_right_down' : '']">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
          <h5>{{ item.title }}</h5>
        </a>
        <transition name="fade">
          <ul v-show="item.active" class="nav_child_list">
            <li v-for="list in item.childs">
              <a :href="list.href" :data-id="list.id"  :class="[list.active ? 'active' : '']">
                <div class="icon">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jian"></use>
                  </svg>
                </div>
                <h5>{{ list.title }}</h5>
              </a>
            </li>
          </ul>
        </transition>
      </li>
      <!--
      <li>
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <h5>个人资料</h5>
        <ul>
          <li>
            <div class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jian"></use>
              </svg>
            </div>
            <h5>个人资料2</h5>
          </li>
          <li>
            <div class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jian"></use>
              </svg>
            </div>
            <h5>个人资料2</h5>
          </li>
          <li>
            <div class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jian"></use>
              </svg>
            </div>
            <h5>个人资料2</h5>
          </li>
          <li>
            <div class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jian"></use>
              </svg>
            </div>
            <h5>个人资料2</h5>
          </li>
        </ul>
      </li>
      <li>
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <h5>个人资料</h5>
      </li>
      <li>
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <h5>个人资料</h5>
      </li>
      <li>
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <h5>个人资料</h5>
      </li>
      -->
    </ul>
  </div>
</template>

<script>
  var arr = [];
  arr[0] = {title : '测试1',id : '',active : true, href:'javascript:;',childs : [
    {title : '测试1-1',id : 'aaaa' ,href:"#/aaaa",active : true},
    {title : '测试1-2',id : 'bbbb' ,href:"#/bbbb"},
    {title : '测试1-3',id : 'cccc' ,href:"#/cccc"},
    {title : '测试1-4',id : 'dddd' ,href:"#/dddd"},
  ]};
  arr[1] = {title : '测试2',href:'javascript:;',childs : [
    {title : '测试2-1',id : 'aaaa' ,href:"#/aaaa"},
    {title : '测试2-2',id : 'bbbb' ,href:"#/bbbb"},
    {title : '测试2-3',id : 'cccc' ,href:"#/cccc"},
    {title : '测试2-4',id : 'dddd' ,href:"#/dddd"},
  ]};
  arr[2] = {title : '测试3',href:'javascript:;',childs : []};

  export default {
    name : 'app',
    data () {
      return {
        active : "login",
        title : "",
        listArr : arr
      }
    },
    methods : {
      go_recoverpw () {
        window.location.hash = '#/recoverpw';
        this.tiltle = '找回密码';
        this.active = 'recoverpw';
      },
      set_active (name) {
        let listArr,listArr2,count;
        for (let i=0,maxi=this.listArr.length;i<maxi;i++) {
          listArr = this.listArr[i];
          count = false;
          for (let j=0,maxj=listArr.childs.length;j<maxj;j++) {
            listArr2 = listArr[j];
            if (name == listArr2.id) {
              listArr2.active = true;
              count = true;
            } else {
              listArr2.active = false;
            }
          }
          if (count) {
            listArr.active = true;
          } else {
            listArr.active = false;
          }
        }
      }
    },
    createds () {
      console.log(this);

    },
    created (){


    },
    components : {}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "pc_left.styl";
</style>

