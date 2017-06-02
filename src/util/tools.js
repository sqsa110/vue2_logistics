/*
import './jszip.js'
import './xlsx.full.min'
import './xlsx'
*/

import XLSX from 'xlsx';

function DownloadXls(title,data,name,type){
  this.titleArr = title;
  this.data = data;
  this.name = name;
  this.type = type;
  this.init();
}

DownloadXls.prototype.init = function(){
  this.init_data();
};

DownloadXls.prototype.getChorCol = function(n){
  var temCol = '',
  s = '',
  m = 0
  while(n > 0) {
  m = n % 26 + 1
  s = String.fromCharCode(m + 64) + s
  n = (n - m) / 26
  }
  return s
};

DownloadXls.prototype.s2ab = function(s){		//字符串转字符流
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) {
  view[i] = s.charCodeAt(i) & 0xFF
  };
  return buf;
};

DownloadXls.prototype.init_data = function(){
  var keyMap = [];
  var tmpdata = [];
  for (var key in this.titleArr) {
    keyMap.push(key)
  }
  keyMap.forEach(function(v,i){
    var col = i > 25 ? this.getChorCol(i) : String.fromCharCode(65+i);
    var dataType = this.titleArr[v].type;
    tmpdata[col+1] = {v : this.titleArr[v].val};
    if (dataType === 'select') {
      this.data.forEach(function(k,j){
        var val = {v : ''};
        if (k[v]) {
          val.v =  this.titleArr[v].list[k[v] + '']
        }
        tmpdata[col + (j+2)] = val
      }.bind(this))
    } if (dataType === 'time' || dataType === 'date' || dataType === 'datetime') {
      this.data.forEach(function(k,j){
        var date;
        var val = {v : ''};
        if (k[v]) {
          date = new Date(k[v]);
          val.v = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }
        tmpdata[col + (j+2)] = val;
      }.bind(this))
    } else {
      if (dataType !== 'sys') {
        this.data.forEach(function(k,j){
          var val = {v : ''};
          if (k[v]) {
            val.v = k[v];
          }
          tmpdata[col + (j+2)] = val;
        }.bind(this))
      }
    }
  }.bind(this))
  this.tmpdata = tmpdata;
  this.decode_exl();
};

DownloadXls.prototype.decode_exl = function(){
  var outputPos = Object.keys(this.tmpdata);	//设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames : ['data'],
    Sheets : {
      'data' : Object.assign({},this.tmpdata,{
        '!ref' : outputPos[0] + ':' + outputPos[outputPos.length - 1]
      })
    }
  };
  this.tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
    {bookType : (this.type == undefined ? 'xlsx' : this.type),bookSST:false,type:'binary'}	//这里的数据是用来定义导出的格式类型
  ))],{type : ''});
  this.down_file();
};

DownloadXls.prototype.down_file = function(){
  var href = URL.createObjectURL(this.tmpDown);
  var a = document.createElement('a');
  a.download = this.name;
  a.href = href;
  a.click();
  this.btn_dom = a;
  this.remove_url();
};

DownloadXls.prototype.remove_url = function(){
  //延时释放
  setTimeout(function(){
    URL.revokeObjectURL(this.tmpDown);	//用URL.revokeObjectURL()来释放这个object URL
    this.btn_dom = '';
  }.bind(this),100)
};

exports.DownloadXls = function(title,data,name,type){
  new DownloadXls(title,data,name,type);
};
