<template>
    <div class="container">
        <div class="login-header"></div>
        <div class="login-logo">
            <img src="../imgs/logo.png">
        </div>
        <div class="login-container">
            <div class="login-form">
                <h1 class="login-title">登录</h1>
                <label for="email" class="login-label">工作邮箱</label>
                <input type="text" name="email" class="login-txt" id="email" v-model="user.email">
                <button class="login-btn" @click="login()">登录</button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import loginService from '../services/login';
    export default{
        data(){
            return {
                user:{email:'1003512331@qq.com'}
            }
        },
        methods: {
            //登录
            login(){
                loginService.login(this,this.user.email,(data)=>{
                     this.$router.go({name:'user',params:{userId:data._id}});
                });
            }
        }
    }
</script>
<style>
@import "../css/login.css";
</style>