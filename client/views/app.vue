<template>
    <div class="panel">
        <div class="panel-left">
            <div class="panel-left-options">
                <ul class="log-options">
                    <li class="js-add" @click="insertDairy(`${$route.path}/dairy`)">
                        <!--<i class="icon iconfont">&#xe601;</i>-->
                        <img src="../imgs/add.png" alt="添加">
                    </li>
                    <li id="calendar" class="js-calendar">
                        <img src="../imgs/calendar.png" alt="日历">
                    </li>
                    <input type="button" class="my-datepicker datepicker-here">
                </ul>
            </div>
            <div class="user-option">
                <img src="../imgs/userimg.png" class="js-user" width="80px" alt="头像">
                <div class="header-menu" style="display: none">
                    <div class="user">
                        <img src="../imgs/userimg.png" width="100" height="100" alt="头像">
                        <span>刘娟娟</span>
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
    import loginService from '../services/login';
    export default{
        ready(){
            //个人中心悬浮
            var $headerMenu = $('.header-menu');
            $('.user-option').hover(function () {
                $headerMenu.toggle();
            });
        },
        methods:{
            //点击加号效果转换及跳转
            insertDairy(){
                if($('.js-add').hasClass('log-options-active')){
                    $('.js-add').removeClass('log-options-active');
                    this.$router.go({name:'user',params:{userId:this.$route.params.userId}});
                }else{
                    $('.js-add').addClass('log-options-active');
                    this.$router.go(this.$route.path+'/dairy');
                }
            },
            //登出系统
            logout(){
                this.$router.go({name:'login'});
            }
        }
    }
</script>
<style>
    @import "../css/app.css";
</style>
