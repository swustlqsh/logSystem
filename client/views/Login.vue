<template>
    <input type="email" id="email" placeholder="email" v-model="user.email">
    <button type="submit"  @click="login()">登录</button>
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
            login(){
                loginService.login(this,this.user.email);
            }
        }
    }
</script>