<template>
    <!--遮罩层-->
    <div id="mask" class="mask" style="display:none;"></div>
    <div class="panel">
        <div class="panel-left">
            <div class="panel-left-options">
                <ul class="log-options">
                    <li class="js-add" @click="insertDairy(`${$route.path}/dairy`)">
                        <!--<i class="icon iconfont">&#xe601;</i>-->
                        <img src="../imgs/add.png" title="add" alt="添加">
                    </li>
                    <li id="calendar" class="js-calendar">
                        <img src="../imgs/date.png" title="date" alt="日历">
                    </li>
                    <input type="button" class="my-datepicker datepicker-here">
                    <li>
                        <img class="js-department" src="../imgs/user.png" title="user" alt="用户">
                    </li>
                </ul>
            </div>
            <div class="user-option">
                <img src="../imgs/userimg.png" class="js-user" width="80px" alt="头像">
                <div class="header-menu" style="display: none">
                    <div class="user">
                        <img src="../imgs/userimg.png" width="100" height="100" alt="头像">
                        <span>{{me.name?me.name:'匿名用户'}}</span>
                    </div>
                    <ul class="menu">
                        <li>
                            <div class="menu-item" @click="logout()">
                                <img src="../imgs/logout.png" alt="退出登录">
                                <span class="logout">退出登录</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel-main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import appService from '../services/app'
    export default{
        ready(){
            //个人中心悬浮
            var $headerMenu = $('.header-menu');
            $('.user-option').hover(function () {
                $headerMenu.toggle();
            });
            //hover更换背景图
            $('.log-options li img').unbind('hover').hover(function () {
                var $img = $(this);
                if ($img.attr('title') == "add")
                    $img.attr('src', '../imgs/add_hover.png');
                else if ($img.attr('title') == "date")
                    $img.attr('src', '../imgs/date_hover.png');
                else if ($img.attr('title') == "user")
                    $img.attr('src', '../imgs/user_hover.png');
            }, function () {
                var $img = $(this);
                if ($img.attr('title') == "add")
                    $img.attr('src', '../imgs/add.png');
                else if ($img.attr('title') == "date")
                    $img.attr('src', '../imgs/date.png');
                else if ($img.attr('title') == "user")
                    $img.attr('src', '../imgs/user.png');
            });
            this.myCenter()
        },
        data(){
          return{
              me:{name:''}
          }
        },
        methods: {
            //点击加号效果转换及跳转
            insertDairy(){
                //新增时要隐藏遮罩层
                if (!$('#mask').is(":hidden"))
                    $('#mask').hide();

                $('img[title="user"]').attr('src', '../imgs/user.png');
                if ($('.js-add').hasClass('log-options-active')) {
                    $('.js-add').removeClass('log-options-active');
                    $('img[title="add"]').attr('src', '../imgs/add.png').hover(function () {
                        $(this).attr('src', '../imgs/add_hover.png');
                    }, function () {
                        $(this).attr('src', '../imgs/add.png');
                    });
                    this.$router.go({name: 'user', params: {userId: this.$route.params.userId}});
                } else {
                    $('.js-add').addClass('log-options-active');
                    $('img[title="add"]').attr('src', '../imgs/add_select.png').hover(function () {
                        $(this).attr('src', '../imgs/add_hover.png');
                    }, function () {
                        $(this).attr('src', '../imgs/add_select.png');
                    });
                    this.$router.go(this.$route.path + '/dairy');
                }
            },
            //登出系统
            logout(){
                this.$router.go({name: 'login'});
            },
            //个人中心
            myCenter(){
                appService.me(this,this.$route.params.userId,data=>{
                    this.me=data;
                })
            }
        }
    }
</script>
<style>
    @import "../css/app.css";
</style>
