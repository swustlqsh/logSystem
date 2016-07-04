<template>
    <div class="panel">
        <div class="panel-left">
            <div class="panel-left-options">
                <ul class="log-options">
                    <li class="js-add log-options-active">
                        <img src="../imgs/add.png" alt="添加">
                    </li>
                    <li class="js-search" @click="changeRouter('search')">
                        <img src="../imgs/search.png" alt="搜索">
                    </li>
                    <li class="js-calender" @click="changeRouter('calendar')">
                        <img src="../imgs/calendar.png" alt="日历">
                    </li>
                    <input type="button" class="my-datepicker datepicker-here">
                </ul>
            </div>
            <div class="user-option">
                <img src="../imgs/header.png" class="js-user" width="80px" alt="头像">
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        ready(){

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