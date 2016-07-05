<template>
    <div class="panel">
        <div class="panel-left">
            <div class="panel-left-options">
                <ul class="log-options">
                    <li id="add" class="js-add" @click="changeRouter('add')">
                        <img src="../imgs/add.png" alt="添加">
                    </li>
                    <!--<li id="search" class="js-search" @click="changeRouter('search')">
                        <img src="../imgs/search.png" alt="搜索">
                    </li>-->
                    <li id="calendar" class="js-calender" @click="changeRouter('calendar')">
                        <img src="../imgs/calendar.png" alt="日历">
                    </li>
                    <input type="button" class="my-datepicker datepicker-here">
                </ul>
            </div>
            <div class="user-option">
                <img src="../imgs/header.png" class="js-user" width="80px" alt="头像">
                <div class="header-menu" style="display: none">
                    <div class="user">
                        <img src="../imgs/header.png" width="100" height="100" alt="头像">
                        <span>刘娟娟</span>
                    </div>
                    <ul class="menu">
                        <!-- <li>
                             <div class="menu-item">
                                 <img src="../imgs/setting.png" alt="设置">
                                 <span>设置</span>
                             </div>
                         </li>-->
                        <li>
                            <div class="menu-item">
                                <img src="../imgs/logout.png" alt="退出登录">
                                <span>退出登录</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel-main">
            <div class="panel-main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        ready(){
            var $=require('jquery');
            var $headerMenu = $('.header-menu');
            $('.user-option').hover(function () {
                $headerMenu.toggle();
            });
        },
        data(){
            return{

            }
        },
        methods:{
            changeRouter(route){
                this.$router.go(route)
            }
        }
    }
</script>