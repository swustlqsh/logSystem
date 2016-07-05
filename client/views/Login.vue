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
                user:{email:'1003512331@qq.com'}
            }
        },
        methods: {
            login(){
//                this.$router.go('index');

                this.$http.get('http://localhost:1234/user/clientLogin/'+this.user.email).then(function (res) {
                    if(res.data.code==200){
                        this.$router.go('index')
                    }else if(res.data.code==203){
                        alert('此用户未注册');
                    }

                }, function (err) {
                    console.log(err);
                });
            }
        }
    }
</script>