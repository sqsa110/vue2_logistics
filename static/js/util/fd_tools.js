
(function($){
  function Jq_tools () {
    this.init();
  }
  Jq_tools.prototype.init = function (){
    this.search();
    this.getVueRouteName();
    this.cookieOper();
    this.oper_cookie();
  };

  //读取url参数信息
  Jq_tools.prototype.search = function (){
    //jq 获取Url search方法
    function Search(){
      this.searchData = window.location.search;
    }

    Search.prototype.init = function(opt,off){
      this.data = this.select();
      this.opt = opt;
      this.off = off;
      var data = this.checkOpt();
      return data;
    }

    Search.prototype.checkOpt = function(){
      var optType = Object.prototype.toString.call(this.opt);
      if (optType == '[object String]') {
        return this.strFn();
      } else if (optType == '[object Array]' && !this.off) {
        return this.arrFn();
      } else if (optType == '[object Array]' && this.off) {
        return this.objFn();
      } else {
        return this.data;
      }
    }

    Search.prototype.objFn = function(){
      var obj = {};
      for (var i=0,maxi=this.opt.length;i<maxi;i++) {
        obj[this.opt[i]] = this.data[this.opt[i]];
      }
      return obj;
    }

    Search.prototype.strFn = function(){
      return this.data[this.opt];
    }

    Search.prototype.arrFn = function(){
      var arr = [];
      for (var i=0,maxi=this.opt.length;i<maxi;i++) {
        arr.push(this.data[this.opt[i]]);
      }
      return arr;
    }

    Search.prototype.select = function(){
      var search = this.searchData;
      var searchArr;
      var searchObj = {};
      var arr;
      var test;
      if (search) {

        search = search.substring(1);
        if (search.indexOf('&')<0) {
          searchObj = this.division(search);
        } else {
          searchArr = search.split('&');
          for (var i=0,maxi=searchArr.length;i<maxi;i++) {
            test = this.division(searchArr[i]);
            for (var j in test) {
              searchObj[j] = test[j];
            }
          }
        }
      }
      return searchObj;
    }

    Search.prototype.division = function(str){
      var arr;
      var obj = {};
      if (str.indexOf('=')>0) {
        arr = str.split('=');
        if (arr.length === 2) {
          obj[arr[0]] = arr[1];
        }
      }
      return obj;
    }

    $.extend({
      getSearch : function(opt,off){
        var getSearch = new Search();
        return getSearch.init(opt,off);
      }
    });
  };

  //读取vue路由
  Jq_tools.prototype.getVueRouteName = function (){
    function GetVueRouteName(){
    }
    GetVueRouteName.prototype.init = function (opt,off) {
      return this.getName();
    };
    GetVueRouteName.prototype.getName = function () {
      var url = window.location.hash;
      var routerNameReg = /^\#\/([a-zA-Z]{1,}[\w\_\.]{0,})/;
      if (routerNameReg.test(url)) {
        return routerNameReg.exec(url)[1];
      } else {
        return '';
      }
    };

    $.extend({
      getVueRouteName : function(opt,off){
        var getVueRouteName = new GetVueRouteName();
        return getVueRouteName.init(opt,off);
      }
    });
  };

  //设置cookie操作
  Jq_tools.prototype.cookieOper = function(){
    function CookieOper(){

    }

    CookieOper.prototype.init = function(key,value,time){

      //判断是否是集合 批量存储
      if(Object.prototype.toString.call(key) == '[object Object]'){

        //判断是否设置过期时间
        if(Object.prototype.toString.call(value) == '[object Number]'){
          for(var i in key){
            this.set(i,key[i],value);
          }
        } else {
          for(var i in key){
            this.set(i,key[i]);
          }
        }

        //判断是否为字符串  单个存储
      } else if(Object.prototype.toString.call(key) == '[object String]'){
        //判断是否读写删除
        //删除
        if(value == true){
          this.clear(key,false);

          //设置
        } else if(value) {

          //判断是否设置过期时间
          if(Object.prototype.toString.call(time) == '[object Number]'){
            this.set(key,value,time);
          } else {
            this.set(key,value);
          }

          //读取
        } else {
          return this.get(key,false);
        }
        //判断是否为数组
      } else if(Object.prototype.toString.call(key) == '[object Array]'){
        //判断是读还是clear
        if(value == true){
          this.clear(key,true);
        } else {
          return this.get(key,true);
        }

      }

    }

    //设置cookie方法
    CookieOper.prototype.set = function(key,value,time){

      var expires;
      if(time){
        var myDate = new Date();
        myDate.setTime(myDate.getTime() + (time*24*60*60*1000));
        expires = "expires=" + myDate.toUTCString();
        document.cookie = key + "=" + value + "; " + expires;
      } else {
        document.cookie = key + "=" + value + "; ";
      }

    }

    //读取cookie方法
    CookieOper.prototype.get = function(key,off){
      var cookied = document.cookie.split('; ');
      var cookiedArr= [];
      var keyArr = [];
      var cookiedStr = null;

      if(Object.prototype.toString.call(key) == '[object Array]'){
        keyArr = key;
      } else {
        keyArr.push(key);
      }

      for(var i=0,maxi=cookied.length;i<maxi;i++){
        var temp = cookied[i].substring(0,cookied[i].indexOf('='));
        $.each(keyArr,function(index,value){
          if(temp == value){
            if(off){
              cookiedArr.push(cookied[i].substring(cookied[i].indexOf('=')+1,cookied[i].length));
              return false;
            } else {
              cookiedStr = cookied[i].substring(cookied[i].indexOf('=')+1,cookied[i].length);
              return false;
            }

          }
        }.bind(this));

        if(cookiedStr){
          break;
        }
      }
      return cookiedStr || cookiedArr;
    }

    //清除cookie方法
    CookieOper.prototype.clear = function(key,arrOff){

      if(arrOff){
        $.each(key,function(index,val){
          this.set(val,'',-1);
        }.bind(this));
      } else {
        this.set(key,'',-1);
      }

    }

    $.extend({
      cookieOper : function(key,value,time){
        var cookies = new CookieOper();
        return cookies.init(key,value,time);;
      }
    });
  };

  //设置操作页面缓存
  Jq_tools.prototype.oper_cookie = function (arg1,arg2,arg3,arg4,arg5) {
    function Oper_Cookie (arg1,arg2,arg3,arg4,arg5,off){
      this.len = arguments.length;
      if (this.len <= 0) {return};
      this.argArr = arguments;
      this.get = false;
    }

    Oper_Cookie.prototype.init = function(){
      this.cookie_type = this.get_cookie_type();
      this.get_io();
      if (this.get) {
        return this.val;
      } else {
        return this;
      }
    };

    //判断存储类型
    Oper_Cookie.prototype.get_cookie_type = function(){
      var len = this.len;
      var c_type;

      if (c_type == 'cookie') {
        return 'cookie';
      } else if (c_type == 'localstorage') {
        return 'localstorage';
      } else if (c_type == 'sessionstorage') {
        return 'sessionstorage'
      } else {
        if (window.localStorage) {
          return 'localstorage';
        } else {
          return 'cookie';
        }
      }
    };

    //判断读写还是清除
    Oper_Cookie.prototype.get_io = function () {
      var arr1_type = Object.prototype.toString.call(this.argArr[0]);
      var argArr = this.argArr;

      if (arr1_type == "[object Array]") {
        if (argArr[1] == true) {
          this.clear_cookie(argArr[0]);
        } else {
          this.get_cookie(argArr[0]);
        }
      } else if (arr1_type == '[object String]') {
        if (typeof(argArr[1]) != 'undefined') {
          if (argArr[1] === true) {
            this.clear_cookie(argArr[0]);
          } else {
            this.set_cookie(argArr[0],argArr[1],argArr[2]);
          }
        } else {
          this.get_cookie(argArr[0])
        }
      } else if (arr1_type == '[object Object]') {
        this.set_cookie(argArr[0],argArr[1]);
      } else {
        return false;
      }
    };

    Oper_Cookie.prototype.set_cookie = function(arg1,arg2,arg3){
      var arg1_type = Object.prototype.toString.call(arg1);
      var arg2_type = typeof(arg2);
      var arg3_type = typeof(arg3);
      var val;
      if (this.cookie_type == 'cookie') {
        $.cookieOper(arg1,JSON.stringify(arg2),arg3);
      } else if (this.cookie_type == 'localstorage') {
        if (arg1_type == '[object Object]') {
          for (var i in arg1) {
            if (arg2_type === 'number') {
              val = this.dateSet(arg1[i],arg2);
            } else {
              val = this.dateSet(arg1[i]);
            }
            localStorage.setItem(i,val);
          }
        } else if (arg1_type == '[object String]') {
          if (arg3_type === 'number') {
            val = this.dateSet(arg2,arg3);
          } else {
            val = this.dateSet(arg2);
          }
          localStorage.setItem(arg1,val);
        }
      } else if (this.cookie_type == 'sessionstorage') {
        if (arg1_type == '[object Object]') {
          for (var i in arg1) {
            if (arg2_type === 'number') {
              val = this.dateSet(arg1[i],arg2);
            } else {
              val = this.dateSet(arg1[i]);
            }
            sessionStorage.setItem(i,val);
          }
        } else if (arg1_type == '[object String]') {
          if (arg3_type === 'number') {
            val = this.dateSet(arg2,arg3);
          } else {
            val = this.dateSet(arg2);
          }
          sessionStorage.setItem(arg1,val);
        }
      }
    };

    Oper_Cookie.prototype.get_cookie = function(key){
      this.get = true;
      var key_type = Object.prototype.toString.call(key);
      var val;
      var obj = {};
      var tempVal;
      if (this.cookie_type == 'cookie') {
        this.val = $.cookieOper(key);
      } else if (this.cookie_type == 'localstorage') {

        if (key_type == '[object Array]') {
          for (var i=0,maxi=key.length;i<maxi;i++) {
            tempVal = this.dateGet(localStorage.getItem(key[i]),key[i])
            obj[key[i]] = tempVal;
          }
          val = obj;
        } else if (key_type == '[object String]') {
          tempVal = this.dateGet(localStorage.getItem(key),key)
          val = tempVal;
        }
      } else if (this.cookie_type == 'sessionstorage') {
        if (key_type == '[object Array]') {
          for (var i=0,maxi=key.length;i<maxi;i++) {
            tempVal = this.dateGet(sessionStorage.getItem(key[i]),key[i])
            obj[key[i]] = tempVal;
          }
          val = obj;
        } else if (key_type == '[object String]') {
          tempVal = this.dateGet(sessionStorage.getItem(key),key)
          val = tempVal;
        }
      }
      this.val = val;
      return val;
    };

    Oper_Cookie.prototype.clear_cookie = function(key){
      var key_type = Object.prototype.toString.call(key);
      if (this.cookie_type == 'cookie') {
        $.cookieOper(key,true);
      } else if (this.cookie_type == 'localstorage') {
        if (key_type == '[object Array]') {
          for (var i=0,maxi=key.length;i<maxi;i++) {
            localStorage.removeItem(key[i]);
          }
        } else if (key_type == '[object String]') {
          localStorage.removeItem(key);
        }
      } else if (this.cookie_type == 'sessionstorage') {
        if (key_type == '[object Array]') {
          for (var i=0,maxi=key.length;i<maxi;i++) {
            sessionStorage.removeItem(key[i]);
          }
        } else if (key_type == '[object String]') {
          sessionStorage.removeItem(key);
        }
      }
    };

    Oper_Cookie.prototype.dateSet = function(val,time) {
      var obj = {};
      obj.val = val;
      if (time) {
        var myDate = new Date();
        var expiration_time = myDate.setTime(myDate.getTime() + (time*24*60*60*1000));
        obj.expiration_time = expiration_time;
      }
      return JSON.stringify(obj);
    };

    Oper_Cookie.prototype.dateGet = function(val,key){
      if (!val) {return val};
      val = JSON.parse(val);
      var myDate = new Date().getTime();
      if (val.expiration_time) {
        if (myDate > val.expiration_time) {
          this.claer_cookie(key);
          return '';
        } else {
          return val.val
        }
      }
      return val.val;
    };

    $.extend({
      oper_cookie : function (arg1,arg2,arg3,arg4,arg5,off) {
        var oper_cookie = new Oper_Cookie(arg1,arg2,arg3,arg4,arg5,off);
        return oper_cookie.init();
      }
    });
  };

  new Jq_tools();
})($);
