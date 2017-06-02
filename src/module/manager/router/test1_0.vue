<template>
  <div>
    <fd_main>
      <div slot="main_header">
        <div>头部显示</div>
      </div>
      <div slot="data_main" v-loading="loading">
        <fd_table
        :select_options="select_options"
        :table_options="title_list"
        :datas="data_list"
        :expand_off="true"
        :check_off="true"
        :operation_off="true"
        @selection_change="handleSelectionChange"
        @handle_edit="handle_edit"
        @handle_delete="handle_delete"
        @alert_edit_finish="alert_edit_finish"
        @alert_push_finish="alert_push_finish"
        @handle_size_change="handle_size_change"
        @handle_current_change="handle_current_change"
        @handle_delete_select="handle_delete_select"
        @select_submit="select_submit"
        :summary_off="true"
        :get_summaries="get_summaries"
        :rules="rules"
        :page_sizes="page_sizes"
        :page_size="page_size"
        :current_page="current_page"
        :page_total="page_total"
        :sort_rule="sort_rule">
          <div>sldfkjlk</div>
          <!--
          <div slot="search_main">
            <el-form ref="select_form" :model="select_form" :class="{'el-form-heigh':selectFormSwitchOff}">

              <el-form-item label="活动形式">
                <el-input v-model="select_form.desc"></el-input>
              </el-form-item>

              <el-form-item label="活动名称">
                <el-input v-model="select_form.name"></el-input>
              </el-form-item>

              <el-form-item label="活动区域">
                <el-select v-model="select_form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="sh"></el-option>
                  <el-option label="区域二" value="bj"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="活动时间">
                <el-date-picker type="datetime" placeholder="开始日期" v-model="select_date1"></el-date-picker>
                <el-date-picker type="datetime" placeholder="结束日期" v-model="select_date1"></el-date-picker>
              </el-form-item>

              <el-form-item label="即时配送">
                <el-switch on-text="" off-text="" v-model="select_form.delivery"></el-switch>
              </el-form-item>

              <el-form-item label="活动性质">
                <el-checkbox-group v-model="select_form.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="特殊资源">
                <el-radio-group v-model="select_form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="活动形式">
                <el-input v-model="select_form.desc"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="select_submit">查询</el-button>
              </el-form-item>

            </el-form>

            <div class="demo-block-control" @click="select_form_switch">
              <i :class="[selectFormSwitchOff ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
              <span></span>
            </div>
          </div>
          -->
        </fd_table>
      </div>
    </fd_main>
  </div>
</template>

<script>
  import fd_table from '../../../components/table/table'
  import fd_main from '../../../components/main/pc_main'

  let userArr = [
    {id:1,name:'lxl',age:29,add:"gz",phone:"15811111111",city:'10001',date:1494408264222},
    {id:2,name:'aaa',age:30,add:"zz",phone:"15822222222",city:'10002',date:1494408264222},
    {id:3,name:'bbb',age:31,add:"dd",phone:"15833333333",city:'10003',date:1494408264222},
    {id:4,name:'ccc',age:32,add:"dd",phone:"15844444444",city:'10001',date:1494408264222},
    {id:5,name:'ddd',age:33,add:"ss",phone:"15855555555",city:'10002',date:''},
  ];
  let titleArr = {
    id:{show:true,type:'sys',val:"序号",width:100,align:"center",sortable:true},
    name:{show:true,type:'string',val:'名称',width:100,align:"center",url:"/test1/index/1"},
    add:{show:true,type:'string',val:'地址',size:'big'},
    phone:{show:true,type:'string',val:'电话',width:300,sortable:true,sortFn:function(a,b){
      console.log(a);
      console.log(b);
      return a - b
    }},
    remarks:{show:false,type:'textarea',size:'big',val:'备注',width:300,sortable:true,sortFn:function(a,b){
      console.log(a);
      console.log(b);
      return a - b
    }},
    city : {show:true,type:'select',val:'城市',remind:'请选择城市',sortable:true,align:"center",list:{
      '10001':'广州',
      '10002':'上海',
      '10003':'北京'
    },formatter : function(row,column){
      let status;
      if (typeof(row) == 'number' || typeof(row) == 'string') {
        status = row;
      } else {
        status = row.city;
      }
      return titleArr.city.list[status];
    }},
    date : {show:true,type:'datetime',val:'日期',sortable:true,align:"center",/*time:true,*/edit:false,remind:'请选择时间'}
  };
  let select_options = [
    {type:'input',title:'活动名称',key:'name'},
    {type:'select',title:'活动区域',key:'region',list:{
      '广州':'0001',
      '北京':'0002'
    }},
    {type:'dateZone',title:'日期范围',key1:'dateZone1',key2:'dateZone2'},
    {type:'date',title:'日期',key:'date'},
    {type:'datetime',title:'日期时间',key:'datetime'},
    {type:'time',title:'时间',key:'time'},
    {type:'timeZone',title:'时间范围',key1:'time1',key2:'time2'},
    {type:'switch',title:'即时配送',key:'delivery'},
    {type:'radio',title:'特殊资源',key:'resource',list:{
      '物品1':'0001',
      '物品2':'0002'
    }},
    {type:'checkbox',title:'活动性质',key:'type',list:{
      '优惠1':'0001',
      '优惠2':'0002'
    }},
    {type:'cascader',title:'地址',key:'zone',list:[
      {value:'0001',label:'河南',children:[
        {value:'0100',label:'漯河',children:[
          {value:'1100',label:'源汇区'},
          {value:'1101',label:'郾城区'}
        ]},
        {value:'0101',label:'郑州'}
      ]},
      {value:'0002',label:'河北'}
    ]}
  ]
  let rules = {
    name : [
      {required:true, message:'请输入名称'},
      {min:3,max:20, message:'长度在3-20个字符'}
    ],
    age : [
      {type:'number',message:'电话必须为数字'}
    ],
    city : [
      {required:true,message:'请选择地区'}
    ]
  };
  let page_sizes = [100,200,300,400];
  let sort_rule = {
    /*
    prop : 'id',
    order : 'descending'
    */
  };


  export default {
    name : 'test1_0',
    data : () => {
      return {
        loading : true,
        title_list : titleArr,
        data_list : [],
        rules : rules,
        page_sizes : page_sizes,
        page_size : 100,
        current_page : 1,
        page_total : 10,
        sort_rule : sort_rule,
        select_options : select_options
      }
    },
    methods : {
      show_warn_message (text){
        this.$message({
          showClose: true,
          message: text,
          type: 'warning'
        });
      },
      handleSelectionChange (val){
        this.multipleSelection = val;
        console.log(val);
      },
      get_summaries (param){
        const { columns,data } = param;
        const sums = [];
        columns.forEach((column,index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if (column.property == 'id' || column.property == 'city' || column.property == 'date_fd' || column.property == 'datetime_fd' || column.property == 'time_fd') {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev,curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            },0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      handle_edit(index,coldata){
        console.log(index);
        console.log(coldata);
      },
      handle_delete(index,coldata,callback){
        console.log(index)
        console.log(coldata)
        setTimeout(function(){

          callback && callback(true);

        }.bind(this),2000);
      },
      alert_edit_finish(data,callback){
        setTimeout(function(){
          callback && callback(true)
        }.bind(this),2000)
        console.log('我这里是test1')
      },
      alert_push_finish(data,callback){
        setTimeout(function(){
          callback && callback(true);
        }.bind(this),2000)
      },
      handle_size_change(val){
        this.page_size  = val;
        console.log(val)
      },
      handle_current_change(val) {
        this.current_page = val;
        console.log(val);
      },
      handle_delete_select(val,callback){
        this.loading = true;
        setTimeout(function(){
          callback && callback(true);
          this.loading = false;
        }.bind(this),2000);
      },
      select_submit(data){
        console.log(data);
      }
    },
    events : {
    },
    mounted (el){
    },
    created () {
      setTimeout(function(){
        this.$set(this._data,'data_list',userArr);
        this.loading = false;
      }.bind(this),2000)
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
