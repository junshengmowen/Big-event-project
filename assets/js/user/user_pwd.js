//表单验证
layui.form.verify({
    pwd: (value) => {
        const reg = /^[\S]{6,12}$/;
        if (!reg.test(value)) {
            return '密码为6-12位的数字'
        }
    },
    samePwd: (value) => {
        if (value === $('[name=oldPwd]').val()) {
            return '新旧密码一致';
        }
    },
    rePwd: (value) => {
        if (value !== $('[name=newPwd]').val()) {
            return '两次密码不一致';
        }
    }
});

//修改密码
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/my/updatepwd',
        method: 'POST',
        data: $(this).serialize(),
        success: (res) => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $(this)[0].reset();
        }
    });
})