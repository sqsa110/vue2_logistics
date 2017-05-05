<template>
  <div class="fd_table">
    <slot name="fd_table">
      <div class="search_main">
        <slot name="search_main">
          <div>我是搜索框</div>
        </slot>
      </div>
      <div class="table_main">
        <slot name="table_main">
          <table>
            <thead>
              <tr>
                <th v-for="(val,key) in titleArr" v-show="val.show">{{val.val}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val,key) in userArr">
                <td v-for="(h,i) in titleArr" v-show="h.show">
                  {{val[i]}}
                </td>
              </tr>
            </tbody>
          </table>
          <el-table
            ref="multipleTable"
            :data="userArr"
            tooltip-effect="dark"
            :stripe="true"
            show-summary
            :default-sort = "sort_rule"
            @selection-change="handleSelectionChange"
            style="width:100%">
            <el-table-column
              type="selection"
              v-if="checkOff"
              width="55">
            </el-table-column>
            <el-table-column
              v-if="expandOff"
              type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item v-for="(val,key) in titleArr" :label="val.val">
                    <span>{{props.row[key]}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column
              v-for="(val,key) in titleArr"
              v-if="val.show && val.width"
              :label="val.val"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="key">
            </el-table-column>
            <el-table-column
              v-else-if="val.show"
              :label="val.val"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="key">
            </el-table-column>

            <el-table-column
              width="100"
              align="center"
              label="操作">
              <template scope="scope">
                <el-button type="primary" icon="edit"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="showdata()">查看数据</el-button>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>
<script>
  let userArr = [
    {id:1,name:'lxl',age:29,add:"gz",phone:"15811111111"},
    {id:2,name:'aaa',age:30,add:"zz",phone:"15822222222"},
    {id:3,name:'bbb',age:31,add:"dd",phone:"15833333333"},
    {id:4,name:'ccc',age:32,add:"dd",phone:"15844444444"},
    {id:5,name:'ddd',age:33,add:"ss",phone:"15855555555"},
  ];
  let titleArr = {
      id:{show:true,val:"序号",width:100,align:"center",sortable:true},
      name:{show:true,val:'名称',align:"center",},
      add:{show:false,val:'地址'},
      phone:{show:true,val:'电话',sortable:true,sortFn:function(a,b){
        console.log(a);
        console.log(b);
        return a - b
      }}
  };
  export default {
    name : 'fd_table',
    data (){
      return {
        titleArr : titleArr,
        userArr : userArr,
        checkArr : [],
        checkOff : false,
        expandOff : true,
        sort_rule : {
          prop : 'id',
          order : 'descending'
        },

      }
    },
    props : {
      id : {
        type : String,
        default : ''
      }
    },
    methods : {
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      showdata(){
        console.log(this.multipleSelection);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "table.styl"
</style>

