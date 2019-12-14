$(function () {
  var page = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        $('tbody').html(template('tpl', info))

        //分页
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,  //版本
          currentPage: page,     // 当前页
          totalPages: Math.ceil(info.total / info.size),  //总页
          onPageClicked: function (a, b, c, d) {  //点击触发第四个属性
            page = d
            render()//重新渲染
          }
        })
      }
    })
  }
  render()

  //添加分类 点击事件
  $('.btn-add').on('click', function () {
    $('.addModal').modal('show')
  })

  //校验表单 不能为空
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 校验分类名字
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名称不能为空'
          }
        }
      }
    }
  })

  // //成功+请求
  $('form').on('success.form.bv', function (e) {
    e.preventDefault()  //阻止默认行为
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      success: function (info) {
        if (info.success) {
          $('.addModal').modal('hide')
          $('form').data('bootstrapValidator').resetForm(true)
          page=1
          render()
        }
      }

    })
  })



})