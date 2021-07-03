//获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            rederAvatar(res.data);
        }
    });
}

//渲染头像
function rederAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        //渲染图片图像
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).css('visibility', 'visible');

    } else {
        //渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).css('visibility', 'visible');
    }
}

getUserInfo();

//退出功能

$('#btnLogout').on('click', function(res) {
    localStorage.removeItem('token');
    layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
        //do something
        location.href = '/login.html';
        layer.close(index);
    });
})