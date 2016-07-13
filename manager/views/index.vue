<template>
    <nav class="navbar navbar-inverse" style="margin: 0;">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" style="color: white">topxgun工作日志管理系统</a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><a @click="logout()" style="color: white">注销</a></li>
            </ul>
        </div>
    </nav>
    <div class="outBorder">
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        methods:{
            logout(){
                sessionStorage.removeItem('user');
                this.$router.go('login');
            }
        }
    }
</script>
