<template>
  <div>
    <h1>12216516514563</h1>
    <fd_main>
      <div slot="main_header">
        <div>头部显示</div>
      </div>
      <div slot="data_main">
        <fd_table
        :loading="loading"
        :title_list="title_list"
        :datas="data_list"
        :expand_off="true"
        :check_off="true"
        :operation_off="true"
        @selection_change="handleSelectionChange"
        @showdata="showdata"
        @handle_edit="handle_edit"
        @handle_delete="handle_delete"
        @alert_edit_finish="alert_edit_finish"
        @alert_push_finish="alert_push_finish"
        @handle_size_change="handle_size_change"
        @handle_current_change="handle_current_change"
        :summary_off="true"
        :get_summaries="get_summaries"
        :rules="rules"
        :page_sizes="page_sizes"
        :page_size="page_size"
        :current_page="current_page"
        :sort_rule="sort_rule">
          <div>sldfkjlk</div>
        </fd_table>
      </div>
    </fd_main>
  </div>
</template>

<script>
  import fd_table from '../../../components/table/table'
  import fd_main from '../../../components/main/pc_main'

  let userArr = [
    {id:1,name:'lxl',age:29,add:"gz",phone:"15811111111",city:10001,date:1494408264222},
    {id:2,name:'aaa',age:30,add:"zz",phone:"15822222222",city:10002,date:1494408264222},
    {id:3,name:'bbb',age:31,add:"dd",phone:"15833333333",city:10003,date:1494408264222},
    {id:4,name:'ccc',age:32,add:"dd",phone:"15844444444",city:10001,date:1494408264222},
    {id:5,name:'ddd',age:33,add:"ss",phone:"15855555555",city:10002,date:''},
  ];
  let titleArr = {
    id:{show:true,type:'sys',val:"序号",width:100,align:"center",sortable:true},
    name:{show:true,type:'string',val:'名称',width:100,align:"center",},
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
    city : {show:true,type:'select',val:'城市',remind:'请选择城市',sortable:true,align:"center",list:[
      {val:10001,name:'广州'},
      {val:10002,name:'上海'},
      {val:10003,name:'北京'}
    ],formatter : function(row,column){
      let status;
      if (typeof(row) == 'number') {
        status = row;
      } else {
        status = row.city;
      }
      for (var i=0,maxi=titleArr.city.list.length;i<maxi;i++) {
        if (titleArr.city.list[i].val == status) {
          return titleArr.city.list[i].name;
        }
      }
    }},
    date : {show:true,type:'datetime',val:'日期',sortable:true,align:"center",time:true,edit:false,remind:'请选择时间'}
  };
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
    name : 'test1',
    data : () => {
      return {
        loading : true,
        title_list : titleArr,
        data_list : [],
        rules : rules,
        page_sizes : page_sizes,
        page_size : 100,
        current_page : 1,
        sort_rule : sort_rule,
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
      showdata (){
        console.log(this.multipleSelection);
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
