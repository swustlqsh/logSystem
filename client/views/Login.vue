<template>
    <input type="email" class="form-control" id="email" placeholder="email">
    <a type="submit" class="btn btn-default" @click="login()">登录</a>
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
            login(){
                this.$router.go('index')
            }
        }
    }
</script>