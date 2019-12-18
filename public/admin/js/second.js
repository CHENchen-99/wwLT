import { template } from "handlebars"

$(function(){
  var page=1
  var pageSize=5
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
      console.log(info)
      $('tbody').html(template('tpl',info))
        //分页
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function() {
            // 修改当前页
            page = arguments[3]
            // 重新渲染
            render()
          }
        })
      }
    })
  }
  render()
//二级分类的添加功能
$('.btn-add').on('click',function(){
  //显示模态框
  $('.addModal').modal('show')
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page:1,
      pageSize:1000
    },
    success:function(info){
      console.log(info)
      $('.dropdown-menu').html(template('tpl2',info))
    }
  })
})

//下拉菜单中的一级分类的每一项都需要有点击事件
$('.dropdown-menu').on('click','a',function(){
  var content=$(this).text()  //获取点击a的内容
  $('.text').text(content)
  var id= $(this).data('id')
  $('[name=categoryId]').val(id)
  $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
})

























})
