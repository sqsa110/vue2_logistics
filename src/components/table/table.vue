<!--
  版本  v0.0.1
  作者  李**
  作用  alert自定义弹窗
  说明

  api手册
    1.共3个插槽，slot名称分别为 alert_title,alert_btns和默认

      实例
      <fd_alert>
        <div slot="alert_title">我替换了标题栏</div>
        <div>我替换了弹窗主体</div>
        <div slot="alert_btns">我替换了按钮组</div>
      </fd_alert>

    2.参数表
      showOff       弹窗显示开关  默认false
      mask_off      遮着层开关    默认true
      btnsOff       按钮组开关    默认true
      cancelOff     取消按钮开关  默认false
      finishOff     完成按钮开关  默认true
      maskClickOff  遮着层按钮取消开关 默认true
      title         标题文本
      cancelTitle   取消按钮文本  默认为取消
      finishTitle   完成按钮文本  默认为确认

   3.点击状态栏后回调事件
      取消按钮回调事件  alert_cancel
      完成按钮回调事件  alert_finish

-->

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

          <el-table
            v-loading.body="loading"
            ref="multipleTable"
            :data="userArr"
            tooltip-effect="dark"
            :stripe="true"
            show-summary
            :summary-method="getSummaries"
            :default-sort = "sort_rule"
            @selection-change="handleSelectionChange"
            style="width:100%">

            <el-table-column
              type="selection"
              v-if="checkOff"
              width="55">
            </el-table-column>

            <el-table-column
              width="55"
              v-if="expandOff"
              type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item v-for="(val,key) in titleArr"  :label="val.val">
                    <span v-if="val.type == 'select'">{{props.row[key + 'name']}}</span>
                    <span v-else-if="val.type == 'date' || val.type == 'time' || val.type == 'datetime'">{{props.row[key + '_fd']}}</span>
                    <span v-else>{{props.row[key]}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column
              v-for="(val,key) in titleArr"
              v-if="val.show && val.type == 'select'"
              :label="val.val"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="(key + 'name')">
            </el-table-column>

            <el-table-column
              v-else-if="val.show && (val.type == 'date' || val.type == 'time' || val.type == 'datetime')"
              :label="val.val"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="key + '_fd'">
            </el-table-column>

            <el-table-column
              v-else-if="val.show"
              :label="val.val"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="key">
            </el-table-column>

            <el-table-column
              width="200"
              align="center"
              label="操作">
              <template scope="scope">
                <el-button type="primary" :loading="scope.row.fd_loadingOff" @click="handleEdit(scope.$index,scope.row)" icon="edit" ></el-button>
                <el-button type="danger" :loading="scope.row.fd_loadingOff" @click="handleDelete(scope.$index,scope.row)" icon="delete" ></el-button>
              </template>
            </el-table-column>

          </el-table>

          <div class="fd_pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-sizes="page_sizes"
              :page-size="page_size"
              layout="sizes,prev,pager,next"
              :total="1000">
            </el-pagination>
            <div class="fd_demonstration">
              <span>显示条数</span>
            </div>
          </div>

          <div style="margin-top: 20px">
            <el-button @click="showdata()">查看数据</el-button>
          </div>

        </slot>
      </div>
    </slot>

    <fd_alert
      v-if="show_alert_off"
      :title="alert_title"
      :btnsOff="true"
      :cancelOff="true"
      :maskClickOff="false"
      @alert_cancel="alert_cancel"
      @alert_finish="alert_finish">
      <slot name="alert_info">
        <el-form ref="edit_form" :rules="rules" :model="edit_form" label-width="80px">

          <el-row>
            <template v-for="(val,key) in titleArr" v-if="((val.type == 'datetime' || val.type == 'date' || val.type == 'time' || val.type != 'sys') && !val.edit)">
              <el-col v-if="val.size == 'big'" :span="24">
                <el-form-item :label="val.val" :prop="key">
                  <el-input v-if="val.type == 'string'"  :disabled="val.disabled" v-model="edit_form[key]"></el-input>
                  <el-input v-else-if="val.type == 'number'" :disabled="val.disabled" v-model="edit_form[key]"></el-input>
                  <el-input v-else-if="val.type == 'text'" :disabled="true" v-model="edit_form[key]"></el-input>
                  <el-input v-else-if="val.type == 'textarea'" type="textarea" :disabled="val.disabled" v-model="edit_form[key]" :rows="3"></el-input>
                  <el-select v-else-if="val.type == 'select'" :disabled="val.disabled" v-model="edit_form[key]" :placeholder="val.remind">
                    <el-option v-for="item in val.list" :key="item.val" :disabled="item.disabled" :label="item.name" :value="item.val">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <template v-else>
                <el-col :lg="6" :sm="11" :xs="23">
                  <el-form-item :label="val.val" :prop="key">
                    <el-input v-if="val.type == 'string'" :disabled="val.disabled" v-model="edit_form[key]"></el-input>
                    <el-input v-else-if="val.type == 'number'" :disabled="val.disabled" v-model="edit_form[key]"></el-input>
                    <el-input v-else-if="val.type == 'text'" :disabled="true" v-model="edit_form[key]"></el-input>
                    <el-select v-else-if="val.type == 'select'" :disabled="val.disabled" v-model="edit_form[key]" :placeholder="val.remind">
                      <el-option v-for="item in val.list" :disabled="item.disabled" :label="item.name" :value="item.val">
                      </el-option>
                    </el-select>
                    <el-date-picker v-else-if="val.type == 'datetime'" v-model="edit_form[key]" @change="dateChangeFormat" type="datetime" :placeholder="val.remind"></el-date-picker>
                    <el-date-picker v-else-if="val.type == 'date'" v-model="edit_form[key]" @change="dateChangeFormat" type="date" :placeholder="val.remind"></el-date-picker>
                    <el-time-picker v-else-if="val.type == 'time'" v-model="edit_form[key]" @change="dateChangeFormat(this,key)" :placeholder="val.remind"></el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :lg="2" :sm="1" :xs="1" style="text-indent:-9999px;">-</el-col>
              </template>
            </template>
          </el-row>
        </el-form>
      </slot>
    </fd_alert>

  </div>
</template>
<script>
  import fd_alert from '../alert'
  import '../../../static/js/util/fd_tools'

  let userArr = [
    {id:1,name:'lxl',age:29,add:"gz",phone:"15811111111",city:10001,cityname:'广州',date:1494408264222},
    {id:2,name:'aaa',age:30,add:"zz",phone:"15822222222",city:10002,cityname:'上海',date:1494408264222},
    {id:3,name:'bbb',age:31,add:"dd",phone:"15833333333",city:10003,cityname:'北京',date:1494408264222},
    {id:4,name:'ccc',age:32,add:"dd",phone:"15844444444",city:10001,cityname:'广州',date:1494408264222},
    {id:5,name:'ddd',age:33,add:"ss",phone:"15855555555",city:10002,cityname:'上海',date:''},
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
      ]},
      date : {show:true,type:'datetime',val:'日期',sortable:true,align:"center",time:true,edit:false,remind:'请选择时间'}
  };

  export default {
    name : 'fd_table',
    data (){
      return {
        loading : true,
        titleArr : titleArr,
        userArr : userArr,
        checkArr : [],
        checkOff : false,
        expandOff : true,
        show_alert_off : false,
        currentPage2 : 5,
        alert_title : '' ,
        edit_form : {},
        rules : {
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
        },
        cancelTitle : '取消',
        finishTitle : '提交',
        handleSizeChange(val) {
          console.log('每页' + val + '条')
        },
        handleCurrentChange(val) {
          this.$emit('')
          console.log('当前页' + val);
        },
        page_sizes : [100,200,300,400],
        page_size : 100,
        sort_rule : {
          prop : 'id',
          order : 'descending'
        }
      }
    },
    props : {
      id : {
        type : String,
        default : ''
      }
    },
    mounted : function(){
      setTimeout(function(){
        this.loading = false;
      }.bind(this),1000);
    },
    methods : {
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      showdata(){
        console.log(this.multipleSelection);
      },
      getSummaries(param){
        const { columns,data } = param;
        const sums = [];
        columns.forEach((column,index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if (column.property == 'id' || column.property == 'date_fd' || column.property == 'datetime_fd' || column.property == 'time_fd') {
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
      handleEdit(index,coldata){
        let data = {};
        data = $.extend(data,coldata);
        this.$set(this._data,'edit_form',data);
        this.$set(this._data,'show_alert_off',true);
      },
      handleDelete(index,coldata){
        console.log(index)
        console.log(coldata)
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$set(coldata,'fd_loadingOff',true);
          setTimeout(function(){
            for (var i=0,maxi=this.userArr.length;i<maxi;i++) {
              if (coldata == this.userArr[i]) {
                this.userArr.splice(i,1);
                this.$set(this._data,'userArr',this.userArr);
                break;
              }
            }

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$set(coldata,'fd_loadingOff',false);

          }.bind(this),2000);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        console.log(index)
        console.log(coldata)
      },
      alert_finish(callback){
        let rule = 'edit_form';
        console.log('完成');

        setTimeout(function(){
          this.$refs[rule].validate((valid) => {
            if (valid) {
              alert('submit!');
              this.userArr.forEach(function(v,i){
                if (v.id == this.edit_form.id) {
                  $.each(this.titleArr,function(key,val){

                    //如果值相等跳出循环
                    if (this.edit_form[key] === v[key]) {
                      return true;
                    }

                    if ((val.type == 'date' || val.type == 'time' || val.type == 'datetime') && this.edit_form[key] != v[key]) {
                      //判断是否是时间
                      this.edit_form[key] = this.edit_form[key].getTime();
                      this.edit_form[key + fd_config.sign] = $.get_date_time(this.edit_form[key],val.type);

                    } else if (val.type == 'select') {
                      //判断是否是下拉框

                      $.each(val.list,function(j,t){
                        if (t.val == this.edit_form[key]) {
                          this.edit_form[key + 'name'] = t.name;
                        }
                      }.bind(this));
                    }
                  }.bind(this));
                  console.log(this.edit_form);
                  this.$set(this.userArr,i,this.edit_form);
                }
              }.bind(this));
              callback && callback(true);
              this.$set(this._data,'show_alert_off',false);
            }  else {
              console.log('error submit!!');
              callback && callback();
              return false;
            }
          });

        }.bind(this),1000);

      },
      alert_cancel(rule){
        console.log('取消');
        this.$set(this._data,'show_alert_off',false)
      },
      dateChangeFormat(date){
        /*
        console.log(date)
        let time;
        let reg = /^(\d{1,2}\:){2}\d{1,2}$/;
        if (reg.test(date)) {
          time = '1970/01/01 ' + date;
        } else {
          time = date;
        }
        this.edit_form
        console.log(time);
        console.log('变动');
        */
      },
      format_date(key,types){
        this.userArr.forEach(function(val,i){
          val[key + fd_config.sign] = $.get_date_time(val[key],types);
        });
      }
    },
    computed : {

    },
    created : function(){
      $.each(this.titleArr,function(key,val){

        if (val.type == 'date' || val.type == 'time' || val.type == 'datetime') {
          this.format_date(key,val.type);
        }

      }.bind(this));
    },
    components : {fd_alert}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "table.styl"
</style>
