<!--
  版本  v0.0.1
  作者  李**
  作用  table表格
  说明

  api手册
    1.共3个插槽

      实例
      <fd_alert>
        <div slot="alert_title">我替换了标题栏</div>
        <div>我替换了弹窗主体</div>
        <div slot="alert_btns">我替换了按钮组</div>
      </fd_alert>

    2.参数表
      table_options         表格的配置项
                {
                  key : {               //key键值(必须)
                    show : true,        //是否显示              默认为false
                    type : 'string',    //数据展现类型(必须)    默认-             值类型 [   sys(系统值不显示)   string(文本,string)   textarea(可编辑文档区域,string)   select(下拉菜单,string)    datetime(日期-时间,时间戳)  date(日期,时间戳)  time(时间,时间戳)  progress(进度条,number)]
                    val : 'string',     //表头名称              默认''
                    width : 100,        //表格宽度              默认'auto'
                    align : 'center',    //对齐类型              默认'left'      	值类型 left/center/right
                    sortable : true     //排序                  默认false         值类型 	true, false
                    sortFn : Function(a,b)  //自定义排序方法     默认无           需配合sortable : true使用
                    list : {name:val}   //元素列表              默认无            需配合type : 'select'使用
                 //   formatter : Function(row, column) //格式化表单内容 默认无     需配合type : 'string'使用
                    remind : 'string'   //备注                  默认无            需配合type : 'select|datetime|date|time'使用
                    noedit : true         //是否可以编辑          默认false
                  }
                }

      rules               表格编辑验证规则        校验规则参见 async-validator
      sort_rule           默认的排序列的key和顺序。它的key属性指定默认的排序的列，order指定默认排序的顺序   order: ascending, descending    "{prop: 'key键值', order: 'descending'}"

      datas               表格数据
              [{key:val},……]

      select_options      查询列表配置项
            [
              {
                type : 'select',          //查询类型(必须)      默认无         值类型input(文本)/select(下拉)/dateZone(日期时间范围)/date(日期)/datetime(日期时间)/time(时间)/timeZone(时间范围)/switch(开关)/radio(单选)/checkbox(多选)/cascader(多级下拉)
                title : 'string',         //查询提示            默认''
                key : 'string',           //键值(必须)          默认无         需配合input/switch/radio/checkbox/cascader/date/datetime/time
                key1 : 'string',          //键值(必须)          默认无         需配合dateZone/timeZone
                key2 : 'string',          //键值(必须)          默认无         需配合dateZone/timeZone
                list : [{name:val},……]  //元素列表(必须)      默认无         需配合select/radio/checkbox
                list : [{val:'',label:'',children:[]}]  //子菜单 默认无        需配合cascader,
              },
              ……
            ]

      check_off         //选择框开关       默认false       值类型true/false
      check_title       //选择框表头名     默认'选择框'    需配合check_off=true使用

      expand_off        //详细信息开关    默认false         值类型true/false
      expand_title      //详细信息表头名  默认'详细信息'    需配合expand_off=true使用

      operation_off       //操作开关      默认false
      operationi_title    //操作信息表头名 默认操作

      summary_off         //表格合计栏     默认false
      get_summaries       //自定义合计计算方法   Function(columns,data)

      current_page        //当前页         默认1
      page_total          //总页数         默认1
      page_title          //数据条数提示   默认'显示条数'
      page_sizes          //可选数据条数   默认100,200,300,400
      page_size           //当前数据条数   默认100

      alert_title         //表格弹窗名称  默认''
      cancel_title        //表格弹窗取消按钮名称  默认'取消'
      finish_title        //表格弹窗确认按钮名称  默认'确认'

      loading             //loading加载状态     默认false
      xls_name            //导出xls名称         默认'test.xlsx'

      delete_off          //删除按钮开关        默认true
      edit_off            //编辑按钮开关        默认true
      push_off            //新增按钮开关        默认true
      xls_off             //导出按钮开关        默认true
      show_td_off         //表格列控制器开关    默认true

   3.事件
        selection_change      当选择项发生变化时会触发该事件     参数  selection       配合属性check_off = true生效
        handle_edit           点击编辑按钮触发该事件             参数1 当前数据编号    参数2 当前编辑数据
        handle_delete         点击删除按钮触发该事件             参数1 当前数据编号    参数2 当前删除数据   参数3 回调函数 接收Boolear值 是否成功
        alert_edit_finish     表单编辑完成按钮触发该事件         参数1 修改后的数据    参数2 回调函数 接收Boolear值 是否成功
        alert_push_finish     表单新增数据完成按钮触发该事件     参数1 新增数据        参数2 回调函数 接收Boolear值 是否成功
        handle_size_change    变更表格显示条数后触发             参数1 当前选中值
        handle_current_change 页码点击事件                       参数1 当前页码
        handle_delete_select  删除选中数据按钮                   参数1 当前选中的数据  参数2 回调函数 接收Boolear值 是否成功
        select_submit         搜索按钮触发该事件                 参数1 当前搜索条件表单数据
-->

<template>
  <div class="fd_table">
    <slot name="fd_table">
      <div class="search_main">

        <slot name="search_main">

          <el-form ref="select_form" :model="select_form" class="select_form" :class="{'el-form-heigh':selectFormSwitchOff}" :style="{height:select_form_h + 'px'}">

            <el-form-item v-for="val in select_options" class="select_item" :label="val.title">

              <template v-if="val.type == 'input'">
                <el-input v-model="select_form[val.key]"></el-input>
              </template>
              <template v-else-if="val.type == 'select'">
                <el-select v-model="select_form[val.key]">
                  <el-option v-for="(i,j) in val.list" :label="j" :value="i"></el-option>
                </el-select>
              </template>
              <template v-else-if="val.type == 'dateZone'">
                <el-date-picker type="datetime" placeholder="start" v-model="select_form[val.key1]" @change="date_change(val.key1)"></el-date-picker>
                <el-date-picker type="datetime" placeholder="end" v-model="select_form[val.key2]"  @change="date_change(val.key2)"></el-date-picker>
              </template>
              <template v-else-if="val.type == 'date'">
                <el-date-picker type="date" placeholder="date" v-model="select_form[val.key]"  @change="date_change(val.key)"></el-date-picker>
              </template>
              <template v-else-if="val.type == 'datetime'">
                <el-date-picker type="datetime" placeholder="datetime" v-model="select_form[val.key]"  @change="date_change(val.key)"></el-date-picker>
              </template>
              <template v-else-if="val.type == 'time'">
                <el-time-select v-model="select_form[val.key]" placeholder="time"></el-time-select>
              </template>
              <template v-else-if="val.type == 'timeZone'">
                <el-time-select v-model="select_form[val.key1]" placeholder="start"></el-time-select>
                <el-time-select v-model="select_form[val.key2]" placeholder="end" :minTime="select_form[val.key1]"></el-time-select>
              </template>
              <template v-else-if="val.type == 'switch'">
                <el-switch on-text="" off-text="" v-model="select_form[val.key]"></el-switch>
              </template>
              <template v-else-if="val.type == 'radio'">
                <el-radio-group v-model="select_form[val.key]">
                  <el-radio v-for="(i,j) in val.list" :label="i">{{j}}</el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="val.type == 'checkbox'">
                <el-checkbox-group v-model="select_form[val.key]">
                  <el-checkbox v-for="(i,j) in val.list" :label="i">{{j}}</el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-else-if="val.type == 'cascader'">
                <el-cascader v-model="select_form[val.key]" :options="val.list"></el-cascader>
              </template>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="select_submit">查询</el-button>
            </el-form-item>

          </el-form>

          <div class="demo-block-control" @click="select_form_switch">
            <i :class="[selectFormSwitchOff ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
            <span></span>
          </div>

        </slot>

      </div>

      <div class="table_main">

        <slot name="table_main">
          <div class="edit_mains">
            <el-button-group>
              <el-button v-show="push_off" type="primary" @click="handlePush" icon="plus"></el-button>
              <el-button v-show="delete_off" type="primary" @click="handleDeleteSelect" icon="delete2"></el-button>
              <el-button v-show="xls_off" class="down_file" @click="downXls" type="primary" icon="upload2"></el-button>
              <el-button v-show="show_td_off" type="primary" @click="handleShowTableCol" icon="menu" style="position:relative;"></el-button>
              <el-button type="primary" icon="more"></el-button>
              <ul class="showTableColController" v-if="showTableColControllerOff">
                <li v-if="check_off"><el-checkbox v-model="check_show_off">{{check_title}}</el-checkbox></li>
                <li v-if="expand_off"><el-checkbox v-model="expand_show_off">{{expand_title}}</el-checkbox></li>
                <li v-if="operation_off"><el-checkbox v-model="operation_show_off">{{operation_title}}</el-checkbox></li>
                <li v-for="(val,key) in title_list"><el-checkbox v-model="val.show">{{val.val}}</el-checkbox></li>
              </ul>
            </el-button-group>
          </div>
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
              v-if="check_show_off"
              width="55">
            </el-table-column>

            <el-table-column
              width="55"
              v-if="expand_show_off"
              type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item v-for="(val,key) in title_list"  :label="val.val">
                    <span v-if="val.type == 'date' || val.type == 'time' || val.type == 'datetime'">{{formatter_date(props.row[key],val.type)}}</span>
                    <span v-else-if="val.type == 'progress'">{{props.row[key]}}%</span>
                    <span v-else-if="val.type == 'select'">{{formatter_select(props.row[key],key)}}</span>
                    <span v-else>{{ props.row[key] }}</span>
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
              :prop="key">
              <template scope="scope">
                <span>{{formatter_date(scope.row[key],val.type)}}</span>
              </template>
            </el-table-column>

            <el-table-column
              v-else-if="val.show && val.type == 'select'"
              :label="val.val"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="key">
              <template scope="scope">
                <span>{{formatter_select(scope.row[key],key)}}</span>
              </template>
            </el-table-column>

            <el-table-column
              v-else-if="val.show && val.type == 'progress'"
              :label="val.val"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
              :sort-method="val.sortFn"
              :prop="key">
              <template scope="scope">
                <el-progress v-if="scope.row[key] < 100" :text-inside="true" :stroke-width="18"  :percentage="scope.row[key]" ></el-progress>
                <el-progress v-else :text-inside="true" :stroke-width="18" :percentage="scope.row[key]" status="success"></el-progress>
              </template>
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
              <template scope="scope">
                <a  v-if="val.url" href="javascript:;" @click="go_href(scope.row,val.url)">{{scope.row[key]}}</a>
                <span v-else>{{scope.row[key]}}</span>
              </template>
            </el-table-column>

            <el-table-column
              v-if="operation_show_off"
              width="200"
              align="center"
              label="操作">
              <template scope="scope">
                <el-button type="primary" v-show="edit_off" :loading="scope.row.fd_loadingOff" @click="handleEdit(scope.$index,scope.row)" icon="edit" ></el-button>
                <el-button type="danger" v-show="delete_off" :loading="scope.row.fd_loadingOff" @click="handleDelete(scope.$index,scope.row)" icon="delete" ></el-button>
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
              :total="page_total">
            </el-pagination>
            <div class="fd_demonstration">
              <span>{{page_title}}</span>
            </div>
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
            <template v-for="(val,key) in title_list" v-if="(val.type != 'sys' && val.type != 'progress' && !val.noedit)">
              <el-col class="alert_col" v-if="val.size == 'big'" :span="24">
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
                <el-col class="alert_col" :lg="6" :sm="11" :xs="23">
                  <el-form-item :label="val.val" :prop="key">
                    <el-input v-if="val.type == 'string'" :disabled="val.disabled" v-model="edit_form[key]"></el-input>
                    <el-input v-else-if="val.type == 'number'" :disabled="val.disabled" v-model="edit_form[key]"></el-input>
                    <el-input v-else-if="val.type == 'text'" :disabled="true" v-model="edit_form[key]"></el-input>
                    <el-select v-else-if="val.type == 'select'" :disabled="val.disabled" v-model="edit_form[key]" :placeholder="val.remind">
                      <el-option v-for="(name,item) in val.list" :disabled="item.disabled" :label="name" :value="item"></el-option>
                    </el-select>
                    <el-date-picker v-else-if="val.type == 'datetime'" v-model="edit_form[key]" @change="dateChangeFormat(key)" type="datetime" :placeholder="val.remind"></el-date-picker>
                    <el-date-picker v-else-if="val.type == 'date'" v-model="edit_form[key]" @change="dateChangeFormat(key)" type="date" :placeholder="val.remind"></el-date-picker>
                    <el-time-picker v-else-if="val.type == 'time'" v-model="edit_form[key]" @change="dateChangeFormat(key)" :placeholder="val.remind"></el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line alert_col" :lg="2" :sm="1" :xs="1" style="text-indent:-9999px;">-</el-col>
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
  import tools from '../../util/tools'

  export default {
    name : 'fd_table',
    props : {
      table_options : {
        type : Object,
        default : {}
      },
      datas : {
        type : Array,
        default : []
      },
      select_options : {
        type : Array,
        default : []
      },
      check_off : {
        type : Boolean,
        default : false
      },
      check_title : {
        type : String,
        default : '选择框'
      },
      expand_off : {
        type : Boolean,
        default : false
      },
      expand_title : {
        type : String,
        default : '详细信息'
      },
      operation_off : {
        type : Boolean,
        default : false
      },
      operation_title : {
        type : String,
        default : '操作'
      },
      summary_off : {
        type : Boolean,
        default : false
      },
      current_page : {
        type : Number,
        default : 1
      },
      page_total : {
        type : Number,
        default : 1
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
        default : [100,200,300,400]
      },
      page_size : {
        type : Number,
        default : 100
      },
      sort_rule : {
        type : Object,
        default : {}
      },
      get_summaries : '',
      loading : {
        type : Boolean,
        default : false
      },
      xls_name : {
        type : String,
        default : 'test.xlsx'
      },
      push_off : {
        type : Boolean,
        default : true
      },
      edit_off : {
        type : Boolean,
        default : true
      },
      delete_off : {
        type : Boolean,
        default : true
      },
      xls_off : {
        type : Boolean,
        default : true
      },
      show_td_off : {
        type : Boolean,
        default : true
      }
    },
    data (){
      return {
        show_alert_off : false,
        showTableColControllerOff : false,
        check_show_off : this.check_off,
        expand_show_off : this.expand_off,
        operation_show_off : this.operation_off,
        selectFormSwitchOff : true,
        edit_form : {},
        edit_form_data : {},
        edit_state : 'edit',
        data_list : [],
        title_list : {},
        select_form : {},
        item_h : 0,
        items_h : 0,
        select_form_h : 0
      }
    },
    mounted (){
      console.log(this);
      var $el = $(this.$el).find('.select_form');
      var $item = $el.find('.select_item');
      this.item_h = $item.outerHeight(true);
      this.select_form_h = this.items_h = this.item_h * ($item.length + 1);
    },
    beforeUpdate (){
      console.log('我更新了数据');
      this.title_list = this.table_options;
      this.$set(this._data,'data_list',this.datas);
      this.$set(this._data,'title_list',this.table_options);
    },
    methods : {
      handleSelectionChange(val){
        this.multipleSelection = val;
        this.$emit('selection_change',val);
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
        this.$emit('handle_delete_select',this.multipleSelection,function(off){
          if (off) {
            for (let i=0,maxi=this.data_list.length;i<maxi;i++) {
              for (let j=0,maxj=this.multipleSelection.length;j<maxj;j++) {
                if (this.data_list[i] == this.multipleSelection[j]) {
                  this.data_list.splice(i,1);
                  i--;
                  break;
                }
              }
            }
            this.$set(this._data,'data_list',this.data_list);
          }
        }.bind(this));
      },
      handleShowTableCol () {
        this.showTableColControllerOff = !this.showTableColControllerOff;
      },
      downXls(){
        tools.DownloadXLs(this.title_list,this.data_list,this.xls_name);
      },
      select_submit(){
        this.$emit('select_submit',this.select_form);
      },
      select_form_switch(){
        if (this.selectFormSwitchOff) {
          this.selectFormSwitchOff = false;
          this.select_form_h = this.item_h;
        } else {
          this.selectFormSwitchOff = true;
          this.select_form_h = this.items_h;
        }
      },
      date_change(str){
        this.select_form[str] = this.select_form[str].getTime();
      },
      formatter_date(val,type){
        return $.get_date_time(val,type);
      },
      formatter_select(val,key){
        var text = ''
        $.each(this.table_options,function(i,m){
          if (key == i) {
            $.each(m.list,function(j,n){
              if (j == val) {
                text = n;
                return false;
              }
            });
            return false;
          }
        });
        return text;
      },
      dateChangeFormat(key){
        if (this.edit_form[key] instanceof Date){
          this.edit_form[key] = this.edit_form[key].getTime();
        }
        console.log(this.edit_form);
      },
      go_href(row,url){
        let data = '?';
        let location = window.location;
        for (let i in row) {
          data += (i + '=' + row[i] + '&');
        }
        window.location.href = location.origin + location.pathname + '#' + url + data;
      }
    },
    computed : {

    },
    created (){
      console.log('我创建了数据');
      var opt = {};
      this.select_options.forEach(function(val,i){
        if (val.key) {
          if (val.type == 'cascader' || val.type == 'checkbox') {
            opt[val.key] = [];
          } else {
            opt[val.key] = '';
          }
        } else {
          opt[val.key1] = '';
          opt[val.key2] = '';
        }
      }.bind(this));
      this._data.select_form = opt;
      console.log(this.select_options);
    },
    beforeMount (){

    },
    components : {fd_alert}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" #scoped>
  @import "table.styl"
</style>
