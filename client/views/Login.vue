<template>
    <input type="email" class="form-control" id="email" placeholder="email" v-model="user.email">
    <a type="submit" class="btn btn-default" @click="login()">登录</a>
</template>
<script type="text/ecmascript-6">
    export default{
        ready(){

        },
        data(){
            return {
                user:{email:''}
            }
        },
        methods: {
            login(){
                this.$http.get('http://localhost:1234/user/clientAuth/'+this.user.email).then(function (res) {
                    this.$router.go('index')
                }, function () {
                    console.log(err);
                });
            }
        }
    }
</script>