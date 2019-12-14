$(document).ajaxStart(function(){  //ajax开始事件,只要有ajax发送就会触发
  NProgress.start()
})

$(document).ajaxError(function(){  //ajax开始事件,只要有ajax发送,就会触发
  alert('服务器繁忙')
})
$(document).ajaxStop(function(){  //ajax开始事件,只要有ajax 发送,就会触发
  setTimeout(function(){
    NProgress.done()
  },500)
})