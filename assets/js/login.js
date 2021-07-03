//登录注册页面切换
$('#link_reg,#link_login').on('click', () => {
    $(".reg-box ,.login-box").toggle();
});
//表单验证
layui.form.verify({
    pwd: (value) => {
        const reg = /^[\S]{6,12}$/;
        if (!reg.test(value)) {
            return '密码为6-12位的数字'
        }
    },
    repwd: (value) => {
        if (value !== $('.pwd').val()) {
            return '两次密码不一致'
        }
    }

})


$('#form_reg').on('submit', function(e) {
    e.preventDefault();
    var $this = $(this);
    $.ajax({
        url: '/api/reguser',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            $this[0].reset();
            $('#link_login').click();
        }
    })
});

$("#form_login").on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //将token存进本地存储
            localStorage.setItem('token', res.token);
            //去往主页
            location.href = '/home.html';
        }
    })
})