// 
$(function() {
    //初始化富文本
    initEditor();

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                $('[name=cate_id]').html(template('tpl-cate', res));
                layui.form.render();
            }
        })
    }


    //初始化裁剪图片
    var $image = $('#image');

    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    //初始化裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    });

    //读取图片上传
    $('#coverFile').on('change', function(e) {
        let file = e.target.files[0];
        let imgUrl = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);

    });

    var state = '已发布';
    //发布为草稿
    $('#btnSave2').on('click', function() {
        state = '草稿'
    });
    //提交
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', state);
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            fd.append('cover_img', blob);
            //发起ajax请求
            publishArticle(fd)
        })
    })

    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
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
    initCate();
})