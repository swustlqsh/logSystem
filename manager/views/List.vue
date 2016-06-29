<template>
    <div class="list-group col-md-3 outBorder">
        <button class="btn btn-info" style="margin: 15px">添加部门</button>
        <a class="list-group-item inBorder" v-for="team in teams">{{team.name}}</a>
    </div>
    <div class="col-md-4">
        <h3>人员管理</h3>
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
                teams:[]
            }
        },
        methods:{
            find(){
                this.$http.get('http://localhost:1234/team/find').then((res) => {
                    if(res.data.code==200){
                        this.teams=res.data.data;
                        console.log(this.teams);
                    }
                },(err) => {
                    console.log(err);
                });
            }
        }
    }
</script>