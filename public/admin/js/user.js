$(function () {
  //获取用户数据
  var page = 1
  var pageSize = 5

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
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
          currentPage: page,  //当前页 
          totalPages: Math.ceil(info.total / info.size),   //总页数
          onPageClicked: function (a, b, c, d) {
            page = arguments[3]
            render()
          }
        })
      }
    })
  }

  render()
  //启用禁用功能
  var id, isDelete
  $('tbody').on('click', '.btn', function () {   //委托
    $('.userModal').modal('show')
    id = $(this).data('id')
    isDelete = $(this).hasClass('btn-success') ? 1 : 0
  })
  $('.btn-change').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {
        console.log(info)
        if (info.success) {
          $('.userModal').modal('hide')
          render()
        }
      }
    })
  })
})