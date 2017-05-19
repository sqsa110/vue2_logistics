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
            :data="data_list"
            tooltip-effect="dark"
            :stripe="true"
            :show-summary="summary_off"
            :summary-method="get_summaries"
            :default-sort = "sort_rule"
            @selection-change="handleSelectionChange"
            style="width:100%">

            <el-table-column
              type="selection"
              v-if="check_off"
              width="55">
            </el-table-column>

            <el-table-column
              width="55"
              v-if="expand_off"
              type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item v-for="(val,key) in title_list"  :label="val.val" :formatter="val.formatter">
                    <span v-if="val.type == 'date' || val.type == 'time' || val.type == 'datetime'">{{props.row[key + '_fd']}}</span>
                    <span v-else>{{ val.formatter ? val.formatter(props.row[key]) : props.row[key] }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column
              v-for="(val,key) in title_list"
              v-if="val.show && (val.type == 'date' || val.type == 'time' || val.type == 'datetime')"
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
              :formatter="val.formatter"
              :prop="key">
            </el-table-column>

            <el-table-column
              v-if="operation_off"
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
              :current-page.sync="current_page"
              :page-sizes="page_sizes"
              :page-size="page_size"
              layout="sizes,prev,pager,next"
              :total="1000">
            </el-pagination>
            <div class="fd_demonstration">
              <span>{{page_title}}</span>
            </div>
          </div>


          <div style="margin-top: 20px">
            <!--
             <el-button @click="showdata()">查看数据</el-button>
             -->
            <el-button-group>
              <el-button type="primary" @click="handlePush" icon="plus"></el-button>
              <el-button type="primary" @click="handleDeleteSelect" icon="delete2"></el-button>
              <el-button class="down_file" type="primary" icon="upload2"></el-button>
              <el-button type="primary" icon="more"></el-button>
            </el-button-group>
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
      :cancel_title="cancel_title"
      :finish_title="finish_title"
      @alert_cancel="alert_cancel"
      @alert_finish="alert_finish">
      <slot name="alert_info">
        <el-form ref="edit_form" :rules="rules" :model="edit_form" label-width="80px">

          <el-row>
            <template v-for="(val,key) in title_list" v-if="((val.type == 'datetime' || val.type == 'date' || val.type == 'time' || val.type != 'sys') && !val.edit)">
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


  export default {
    name : 'fd_table',
    props : {
      title_list : {
        type : Object,
        default : {}
      },
      datas : {
        type : Array,
        default : []
      },
      check_off : {
        type : Boolean,
        default : false
      },
      expand_off : {
        type : Boolean,
        default : false
      },
      operation_off : {
        type : Boolean,
        default : false
      },
      summary_off : {
        type : Boolean,
        default : false
      },
      current_page : {
        type : Number,
        default : 5
      },
      alert_title : {
        type : String,
        default : ''
      },
      rules : {
        type : Object,
        default : {}
      },
      cancel_title : {
        type : String,
        default : '取消'
      },
      finish_title : {
        type : String,
        default : '提交'
      },
      page_title : {
        type : String,
        default : '显示条数'
      },
      page_sizes : {
        type : Array,
        default : []
      },
      page_size : {
        type : Number,
        default : 1
      },
      sort_rule : {
        type : Object,
        default : {}
      },
      get_summaries : '',
      loading : {
        type : Boolean,
        default : false
      }
    },
    data (){
      return {
        show_alert_off : false,
        edit_form : {},
        edit_form_data : {},
        edit_state : 'edit',
        data_list : this.datas
      }
    },
    mounted : function(){

    },
    beforeUpdate (){
      console.log('我更新了数据');
      this.$set(this._data,'data_list',this.datas);
    },
    methods : {
      handleSelectionChange(val){
        this.multipleSelection = val;
        this.$emit('selection_change',val);
      },
      showdata(){
        this.$emit('showdata');
      //  console.log(this.multipleSelection);
      },
      handleEdit(index,coldata){
        this.$emit('handle_edit',index,coldata);
        let data = {};
        data = $.extend(data,coldata,true);
        this.$set(this._data,'edit_form',data);
        this.$set(this._data,'show_alert_off',true);
        this.$set(this._data,'edit_form_data',coldata);
      },
      handleDelete(index,coldata){
        this.$set(coldata,'fd_loadingOff',true);
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$emit('handle_delete',index,coldata,function(off){
            if (off) {
              for (var i=0,maxi=this.data_list.length;i<maxi;i++) {
                if (coldata == this.data_list[i]) {
                  this.data_list.splice(i,1);
                  this.$set(this._data,'data_list',this.data_list);
                  break;
                }
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.$set(coldata,'fd_loadingOff',false);
          }.bind(this));

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      alert_finish(callback){

        let rule = 'edit_form';
        this.$refs[rule].validate((valid) => {
          if (valid) {
            if (this.edit_form_data !== '') {
              this.data_list.forEach(function(v,i){
                if (v == this.edit_form_data ) {
                  $.each(this.title_list,function(key,val){

                    //如果值相等跳出循环
                    if (this.edit_form[key] === v[key]) {
                      return true;
                    }

                    if ((val.type == 'date' || val.type == 'time' || val.type == 'datetime') && this.edit_form[key] != v[key]) {
                      //判断是否是时间
                      this.edit_form[key] = this.edit_form[key].getTime();
                      this.edit_form[key + fd_config.sign] = $.get_date_time(this.edit_form[key],val.type);

                    }

                  }.bind(this));
                  this.$emit('alert_edit_finish',this.edit_form,function(off){
                    callback && callback(off);
                    this.$set(this._data,'show_alert_off',false);
                    if (off) {
                      this.$set(this.data_list,i,this.edit_form);
                    }
                  }.bind(this));

                  return true;
                }
              }.bind(this));
            } else {
              this.$emit('alert_push_finish',this.edit_form,function(off){
                callback && callback(off);
                this.$set(this._data,'show_alert_off',false);
                if (off) {
                  this.data_list.push(this.edit_form);
                  //  this.$set(this.data_list,i,this.edit_form);
                }
              }.bind(this));
            }
          }  else {
            console.log('error submit!!');
            callback && callback();
            return false;
          }
        });

      },
      alert_cancel(rule){
        console.log('取消');
        this.$set(this._data,'show_alert_off',false);
        this.$emit('alert_cancel');
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
        this.data_list.forEach(function(val,i){
          val[key + fd_config.sign] = $.get_date_time(val[key],types);
        });
      },
      handleSizeChange(val) {
        this.$emit('handle_size_change',val);
        console.log('每页' + val + '条')
      },
      handleCurrentChange(val) {
        this.$emit('handle_current_change',val);
        console.log('当前页' + val);
      },
      handlePush () {
        this.$emit('handle_push');
        let data = {};
        for (let i in this.title_list) {
          data[i] = '';
        }
        this.$set(this._data,'edit_form',data);
        this.show_alert_off = true;
        this.$set(this._data,'edit_form_data','');
      },
      handleDeleteSelect(){
        this.$emit('handle_delete_select');
      }
    },
    computed : {

    },
    created : function(){
      $.each(this.title_list,function(key,val){

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
