<template>
    <div class="list-group">
        <a href="#" class="list-group-item" v-for="user in users">{{user.name?user.name:'匿名用户'}}</a>
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
                this.$http.get('http://localhost:1234/find').then((res) => {
                    if(res.data.code==200){
                        console.log(res.data.data);
                        this.users=res.data.data;
                    }
                },(err) => {
                    console.log(err);
                });
            }
        }
    }
</script>