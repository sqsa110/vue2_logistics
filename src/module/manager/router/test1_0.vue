<template>
  <div>
    <fd_main>
      <div slot="main_header" class="main_header">
        <div class="histogram chart"></div>
        <div class="piechart chart"></div>
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
        </fd_table>
      </div>
    </fd_main>
  </div>
</template>

<script>
  import fd_table from '../../../components/table/table'
  import fd_main from '../../../components/main/pc_main'
  import echarts from 'echarts'

  let userArr = [
    {id:1,name:'lxl',age:29,add:"gz",phone:"15811111111",city:'10001',date:1494408264222,progress:100},
    {id:2,name:'aaa',age:30,add:"zz",phone:"15822222222",city:'10002',date:1494408264222,progress:90},
    {id:3,name:'bbb',age:31,add:"dd",phone:"15833333333",city:'10003',date:1494408264222,progress:50},
    {id:4,name:'ccc',age:32,add:"dd",phone:"15844444444",city:'10001',date:1494408264222,progress:30},
    {id:5,name:'ddd',age:33,add:"ss",phone:"15855555555",city:'10002',date:'',progress:0}
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
    }},
    date : {show:true,type:'datetime',val:'日期',sortable:true,align:"center",/*time:true,*/noedit:false,remind:'请选择时间'},
    progress : {show:true,type:'progress',val:'进度条',sortable:true}
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
  ];
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
  let option = {
    backgroundColor : '#fff',
    title : {
      text : '广告详情',
      textAlign : 'center',
      textBaseline : 'top',
      padding : 5,
      borderWidth : 1,
      borderColor : '#ccc',
      left : 'center'
    },
    visualMap : {
      show : false,
      min : 80,
      max : 600,
      inRange : {
        colorLightness : [1,0]
      }
    },
    tooltip : {
      trigger : 'item',
      formatter : '{a} <br />{b}: {c} ({d}%)'
    },
    series : [
      {
        name : '访问来源',
        type : 'pie',
        radius : '55%',
        data : [
          {value:235,name:'视频广告'},
          {value:330,name:'联盟广告'},
          {value:310,name:'邮件营销'},
          {value:335,name:'直接访问'},
          {value:400,name:'搜索引擎'}
        ],
        roseType : 'angle',
        label : {
          normal : {
            textStyle : {
              color : 'rgba(0,0,0,0.3)'
            }
          }
        },
        labelLine : {
          normal : {
            lineStyle : {
              color : 'rgba(0,0,0,0.3)'
            }
          }
        },
        itemStyle : {
          normal : {
            color : '#0066ff',
            shadowBlur : 100,
            shadowColor : 'rgba(0,0,0,0.5)'
          }
        }
      }
    ]
  };
  let option2 = {
    title : {
      text : '测试',
      textAlign : 'center',
      textBaseline : 'top',
      padding : 5,
      borderWidth : 1,
      borderColor : '#ccc',
      left : '70%'
    },
    tooltip : {
      trigger : 'item'
    },
    grid : {
      right : '2%',
      left : '25%',
      bottom : '15%',
      top : '10%'
    },
    legend : {
      data : [{
        name : '销量',
        icon : 'image://../static/img/timg.jpg',
        textStyle : {
          fontWeight : 'bold',
          color : 'red'
        }
      },'销量一','价格','价格一'],
      orient : 'vertical',
  //    backgroundColor : '#eee',
  //    borderColor : 'rgba(178,34,34,0.8)',
  //    borderWidth : 4,
  //    padding : 5,
      itemGap : 10,
      left : '1%',
      top : 'center',
      textStyle : {color : 'red'},
      selected : {
        '销量一' : false,
        '价格一' : false
      }
    },
    xAxis : {
      data : ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
    },
    yAxis : [
      {
        type : 'value',
        axisLavel : {
          formatter : '{value} 件'
        }
      },
      {
        type : 'value',
        axisLabel : {
          formatter : '￥{value}'
        },
        splitLine : {show : false}
      }
    ],
    series : [
      {
        name : '销量',
        type : 'bar',
        data : [5,20,36,10,10,20]
      },
      {
        name : '销量一',
        type : 'bar',
        data : [5,20,36,10,10,20]
      },
      {
        name : '价格',
        type : 'line',
        yAxisIndex : 0,
        data : [50,10,36,25,30,20]
      },
      {
        name : '价格一',
        type : 'line',
        data : []
      }
    ]
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
        select_options : select_options,
        histogram_option : option,
        piechart_option : option2
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
    mounted (){
      console.log('mounted')
      var myChart = echarts.init($(this.$el).find('.histogram')[0]);
      myChart.setOption(this.histogram_option);

      var myChart2 = echarts.init($(this.$el).find('.piechart')[0]);
      myChart2.setOption(this.piechart_option);

    },
    created () {
      setTimeout(function(){
        this.$set(this._data,'data_list',userArr);
        this.loading = false;
      }.bind(this),2000)
    },
    beforeMount (){

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
-->

<style lang="stylus" rel="stylesheet/stylus">
  @import "test1_0.styl";
</style>

