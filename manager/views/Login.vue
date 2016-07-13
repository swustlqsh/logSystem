<template>
    <div class="container">
        <form class="form-signin">
            <h2 class="form-signin-heading">请登录</h2>
            <label for="inputEmail" class="sr-only">email</label>
            <input type="text" id="inputEmail" class="form-control"  required autofocus>
            <br/>
            <label for="inputPassword" class="sr-only">密码</label>
            <input type="password" id="inputPassword" class="form-control"  required>
            <button class="btn btn-lg btn-primary btn-block" type="submit" @click="login()">登录</button>
        </form>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        ready(){
        },
        data () {
            return {
                msg: '日志管理'
            }
        },
        methods: {
            login(){
                this.$router.go('list')
            }
        }
    }
</script>
<style>
    .container {
        height: 100%;
        width: 100%;
        padding-top: 40px;
        padding-bottom: 40px;
    }
    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
