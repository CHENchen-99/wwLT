$(function(){
  //登录功能
  //1.表单校验
  var $form =$('form')
  $form.bootstrapValidator({
    fields:{   //字段
      username:{  //用户名的校验规则
        validators:{  //可以多个校验规则
          notEmpty:{  //非空
            message:'用户名不能为空'
          },
          stringLength:{
            min:3,
            max:12,
            message:'用户名格式错误'
          },
          callback:{
            message:'用户名错误'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码格式错误'
          }
        }
      }
    },
    feedbackIcons:{
      // 校验通过的图标
      valid: 'glyphicon glyphicon-thumbs-up',
      // 校验失败的图标
      invalid: 'glyphicon glyphicon-thumbs-down',
      // 正在校验的图标
      validating: 'glyphicon glyphicon-refresh'
    }
  })
  //重置按钮功能
  $('.btn-reset').on('click',function(){
    $form.data('bootstrapValidator').resetForm(true)  //重置样式
  })
  //给登录按钮注册点击事件
  $('.btn-login').on('click', function(e) {
    console.log('哈哈哈')
  })


  $form.on('success.form.bv',function(e){
    e.preventDefault()  //阻止默认行为
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$form.serialize(),
      success:function(info){
        if(info.success){
          location.href='index.html'
        }else if(info.error ===1001){
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        } else {
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                                       //想要修改的name属性 , 想改成什么状态  , 指定显示的错误信息    
        }
      },
    })
  })
})