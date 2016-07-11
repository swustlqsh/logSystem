<template>
    <div class="panel">
        <div class="panel-left">
            <div class="panel-left-options">
                <ul class="log-options">
                    <li  class="js-add" @click="insertDairy(`${$route.path}/dairy`)">
                        <img src="../imgs/add.png" alt="添加">
                    </li>
                    <li id="calendar" class="js-calendar">
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
                        <li>
                            <div class="menu-item" @click="logout()">
                                <img src="../imgs/logout.png" alt="退出登录">
                                <span>退出登录</span>
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
    import appService from '../services/app';
    export default{
        ready(){
            var $headerMenu = $('.header-menu');
            $('.user-option').hover(function () {
                $headerMenu.toggle();
            });
            var $showDatePicker = $('.datepicker-here');
            $showDatePicker.datepicker({
                position: "right bottom",
                language: "zh_CN",
                onSelect: function (fd, date, obj) {
                    console.log(fd, date, obj)
                    obj.hide();
                }
            });
            $('.js-calendar').on('click', function () {
                if (!$showDatePicker.isFocus)
                    $showDatePicker.trigger('focus');
            });
            $('#datepickers-container').on('mouseleave',function(){
                $showDatePicker.trigger('blur');
            })
        },
        data(){
            return{

            }
        },
        methods:{
            insertDairy(){
                if($('.js-add').hasClass('log-options-active')){
                    $('.js-add').removeClass('log-options-active');
                    this.$router.go({name:'user',params:{userId:this.$route.params.userId}});
                }else{
                    appService.insertDairy(this,this.$route.params.userId,(res)=>{
                        if(res.data.code==201){
                            alert('今日日志已经存在，请直接在此页修改！')
                        }else if(res.data.code==200){
                            $('.js-add').addClass('log-options-active');
                            this.$router.go(this.$route.path+'/dairy');
                        }
                    });
                }
            },
            logout(){
                this.$http.get('http://localhost:1234/user/clientLogout/').then(function(res){
                    console.log(res);
                })
            }
        }
    }
</script>
