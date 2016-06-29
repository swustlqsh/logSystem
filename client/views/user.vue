<template>
    <div class="list-group col-md-3 outBorder">
        <a href="#" class="list-group-item inBorder" v-for="user in users">{{user.name?user.name:'匿名用户'}}</a>
    </div>
    <div class="col-md-4">
        <h3>日志管理</h3>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        ready() {
           this.find();
        },
        data () {
            return {
                msg:'团队列表',
                users:[]
            }
        },
        methods:{
            find(){
                this.$http.get('http://localhost:1234/user/find').then((res) => {
                    if(res.data.code==200){
                        this.users=res.data.data;
                    }
                },(err) => {
                    console.log(err);
                });
            }
        }
    }
</script>