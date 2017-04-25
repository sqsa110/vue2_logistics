let module = {};
module.login = function (opt){
  var server = {};
  server.init = function () {
    this.data();
  };
  server.data = function () {
    var data = {};

    this.sendreq(data);
  };
  server.sendreq = function(opts){
    $.ajax({
      url : config.my_url + 'login',
      type : 'jsonp',
      data : 'json',
      cache : false,
      dataType : 'jsonp',
      success : function(data){
        opts.callback && opts.callback(data)
      },
      error : function(){
        opts.callback && opts.callback();
      }
    });
  };
  server.init();

};

export default module;

