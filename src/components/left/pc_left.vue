<template>
  <div class="fd_left">
    <ul class="nav_list">
      <li v-for="(item,index) in listArr">
        <a href="javascript:;" @click.stop="switchActive($event,index)" class="left_nav_btn" :data-index="index"  :class="[item.active?'active' : '']">
          <div class="icon" :class="[item.active?'rotate_right_down' : '']">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
          <h5>{{ item.title }}</h5>
        </a>
        <transition
          @enter="listEnterEl"
          @leave="listLeaveEl"
          :css="false">
          <ul v-show="item.active" class="nav_child_list">
            <li v-for="list in item.childs">
              <a @click.stop="set_active(list.id)" :href="list.href" :data-id="list.id"  :class="[list.active ? 'active' : '']">
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

  export default {
    name : 'app',
    props : {
      nav_list : {
        type : Array,
        default : []
      }
    },
    data () {
      return {
        active : "login",
        title : "",
        listArr : this.nav_list
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
            listArr2 = listArr.childs[j];
            if (name == listArr2.id) {
              this.$set(this.listArr[i].childs[j],'active',true);
              count = true;
            } else {
              this.$set(this.listArr[i].childs[j],'active',false);
            }
          }
          if (count) {
            this.$set(this.listArr[i],'active',true);
          } else {
            this.$set(this.listArr[i],'active',false);
          }
        }
        this.$emit('router_click',name)
      },
      switchActive (ev,count) {

        for (let i=0,maxi=this.listArr.length;i<maxi;i++) {

          if (count == i) {
            this.listArr[i].active = true;
          } else {
            this.listArr[i].active = false;
          }
        }

      },
      listEnterEl(el,done){
        const $el = $(el);
        const $li = $el.find('li');
        $(el).animate({
          height : $li.length * $li.eq(0).outerHeight()
        },500,function(){
          done && done();
        });
      },
      listLeaveEl(el,done) {
        $(el).animate({
          height : 0
        },200,function(){
          done && done();
        });
      //  done();
      }
    },
    created (){


    },
    components : {}   //components components
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "pc_left.styl";
</style>

