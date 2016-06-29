<template>
    <div  class="list-group col-md-3 outBorder">
        <button class="btn btn-info" style="margin: 15px">添加部门</button>
        <a id="user{{$index}}" class="list-group-item inBorder" v-for="team in teams">{{team.name}}
            <span class="pull-right text-info hand">删除&nbsp;&nbsp;</span>
            <span class="pull-right text-info hand" @click="updateTeam($index,team)">修改&nbsp;&nbsp;</span>
        </a>
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
                    }
                },(err) => {
                    console.log(err);
                });
            },
            updateTeam($index,team){
                let _this=this;
                let text=document.getElementById('user'+$index);
                text.innerHTML="<input type='text' id='temp' value="+team.name+">" +
                        "<span id='cancel' class='pull-right text-info hand'>取消&nbsp;&nbsp;</span>" +
                        "<span id='confirm' class='pull-right text-info hand'>确定&nbsp;&nbsp;</span>";
                document.getElementById('cancel').addEventListener('click',()=>{
                    _this.find();
                });
                document.getElementById('confirm').addEventListener('click',()=>{
                    console.log(temp.value);
                    console.log(team);
                    let teamObj={_id:team._id,name:temp.value};
                    _this.$http.post('http://localhost:1234/team/update',teamObj).then((res) => {
                        if(res.data.code==200){
                            _this.find();
                        }
                    },(err) => {
                        console.log(err);
                    });
                })
            }
        }
    }
</script>