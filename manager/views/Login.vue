<template>
    <div class="screen">
       <div class="center">
           用户名：<input type="text">
           密码：<input type="password">
           <button>登录</button>
       </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        ready(){},
        data () {
            return {
                msg: '日志管理'
            }
        },
        methods:{
            login(){
                this.$router.go('list')
            }
        }
    }
</script>
<style>
    .screen{
        height: 100%;
        width: 100%;
    }
    .center{
       margin: auto;
    }
</style>
