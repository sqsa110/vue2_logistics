(function(win,name){
  var config = {
    my_url : 'http://localhost:8080/',
    pf_url : 'http://localhost:8080/',
    sign : '_fd'
  };
  if (win[name]) {

  } else {
    win[name] = config;
  }
})(window,'fd_config')
