<template>
    <div style="padding-top:400px;padding-left: 600px">
        <input type="email" id="email" placeholder="email" v-model="user.email">
        <button type="submit"  @click="login()">登录</button>
    </div>
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
                        this.$router.go('index');
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