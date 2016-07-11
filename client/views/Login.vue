<template>
    <div class="container">
        <form class="form-signin">
            <input type="email" placeholder="email" v-model="user.email">
            <button  type="submit" @click="login()">登录</button>
        </form>
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
            login(){
                loginService.login(this,this.user.email,(res)=>{
                    if(res.data.code==200){
                        this.$router.go({name:'user',params:{userId:res.data.data._id}});
                    }else if(res.data.code==203){
                        alert('此用户未注册');
                    }
                });
            }
        }
    }
</script>
<style>
    .container {
        height: 100%;
        width: 100%;
    }
    .form-signin {
        max-width: 330px;
        padding: 150px;
        margin: 0 auto;
    }
</style>