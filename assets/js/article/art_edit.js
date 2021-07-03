$(function() {
    // 文章编辑
    var params = new URLSearchParams(location.search)
    var artId = params.get('Id');
    var $image = $('#image');
    var state = '';
    //初始化富文本
    initEditor();
    //初始化裁剪图片
    var $image = $('#image');
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    //初始化裁剪区域
    $image.cropper(options);
    //渲染文章分类列表
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                $('[name=cate_id]').html(template('tpl-cate', res));
                layui.form.render();


            }
        })
    }

    function initForm() {
        //初始化表单
        // 发起请求，获取文章详情
        $.ajax({
            url: '/my/article/' + artId,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章失败！')
                }
                // 获取数据成功
                var art = res.data
                    // 为 form 表单赋初始值
                layui.form.val('editArticle', res.data);
                $image.cropper('destroy').attr('src', 'http://www.liulongbin.top:3007' + res.data.cover_img).cropper(options);
            }
        })
    }

    initForm();
    initCate();



    //读取图片上传
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    });

    $('#coverFile').on('change', function(e) {
        let file = e.target.files[0];
        let imgUrl = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    });

    $('#btnSave2').on('click', function() {
        state = '草稿'
    });
    state = '已发布';
    $('#form-edit').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);

        fd.append('state', state);
        console.log(fd.get('state'));

        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            fd.append('cover_img', blob);
            //发起ajax请求
            publishArticle(fd);
        })


    })

    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/edit',
            method: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })

    }

})