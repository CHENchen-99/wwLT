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

//给分类管理注册点击事件 二级菜单显示和隐藏
$('.category').on('click',function(){
  $('.second').slideToggle()
})


//点击上边三条杠 左边侧边栏显示隐藏
$('.btn-aside').on('click',function(){
  $('.aside, .content, .topBar').toggleClass('now')
})

//退出功能
$('.btn-logout').on('click', function(){
  $('.logoutModal').modal('show')
  // console.log('哈哈哈哈')
  $('.btn-sure').on('click',function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function(info){
        if(info.success){
          location.href='login.html'
        }
      }
    })
  })
})







