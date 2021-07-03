function initArtList() {
    $.ajax({
        url: '/my/article/cates',
        success: (res) => {
            $('tbody').html(template('tpl-table', res));
        }
    })
}

var index = null;
//弹出分类层
$('#btnAddCate').on('click', function() {
    //通过这种方式弹出的层，每当它被选择，就会置顶。
    index = layer.open({
        type: 1,
        title: '添加文章类别',
        area: ['520px', '250px'],
        content: template('dialog-add', {})
    });
});
//添加分类
$('body').on('submit', '#form-add', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/my/article/addcates',
        method: 'POST',
        data: $(this).serialize(),
        success: (res) => {

            if (res.status !== 0) {
                return layer.msg(res.massage)
            }
            initArtList();
            layer.close(index);
        }
    })
});

var index = null;
//编辑分类
$('tbody').on('click', '.btn-edit', function() {
    var id = $(this).attr('data-id');
    index = layer.open({
        type: 1,
        title: '修改文章类别',
        area: ['520px', '250px'],
        content: template('dialog-edit', {})
    });

    $.ajax({
        url: '/my/article/cates/' + $(this).attr('data-id'),
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layui.form.val('form-edit', res.data);
        }
    })
})

$('body').on('submit', '#form-edit', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/my/article/updatecate',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            initArtList();
            layer.close(index);
        }
    })
})

//删除分类
$('tbody').on('click', '.btn-delete', function() {
    let id = $(this).attr('data-id')
    $.ajax({
        url: '/my/article/deletecate/' + id,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            layer.confirm('是否删除', { icon: 3, title: '提示' }, function(index) {
                //do something
                initArtList();
                layer.msg(res.message);
                layer.close(index);
            });

        }
    })
})





initArtList();