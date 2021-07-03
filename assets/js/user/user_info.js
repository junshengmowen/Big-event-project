//获取用户信息
function initUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // layer.msg(res.message);
            layui.form.val('formUserInfo', res.data)
        }
    });
}

//表单验证
layui.form.verify({
    nickname: function(value) {
        if (value.length > 6) {
            return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    }
});

//提交
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);

            //渲染整个页面
            window.parent.getUserInfo();
        }
    })
});
//重置
$('#btnReset').on('click', function(e) {
    e.preventDefault();
    initUserInfo();
})


initUserInfo();