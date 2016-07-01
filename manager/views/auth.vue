<template>
    <div class="col-lg-offset-3 col-lg-6">
        <div class="col-lg-9">
            <h2><b><span class="text-info">{{user.name?user.name:'匿名用户'}}</span>的访问权限管理</b></h2>
        </div>
        <div class="col-lg-3 top20">
            <a class="btn btn-info btn-sm pull-right" v-link="{path:'/list'}">返回员工列表</a>
        </div>
        <div class="col-lg-12 top45">
            <div v-for="team in teamUsers">
                <h3 class="glyphicon glyphicon-tree-deciduous text-info"><b>{{team.name}}</b></h3>
                <div v-if="team.items.length<1" class="left15">
                    <p>此部门暂无员工</p>
                </div>
                <div class="col-lg-12">
                    <div v-for="u in team.items" class="left15 left">
                        <input type="checkbox" id="{{u._id}}"  value="{{u._id}}" v-model="visitedUser">&nbsp;{{u.name}}
                        <!--<p>{{user.name}}</p>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="pull-right">
            <button class="btn btn-info btn-sm" @click="save">保存</button>
            <button class="btn btn-info btn-sm" @click="cancel">取消</button>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        ready(){
            this.find(this.$route.params.userId);
            this.findVisits(this.$route.params.userId);
            this.findTeamUser();
        },
        data(){
            return{
                user:{},
                visitedUser:[],
                teamUsers:[]
            }
        },
        methods:{
            findVisits(userId){
                this.$http.get('http://localhost:1234/userVisit/findVisits/'+userId).then((res)=>{
                    if(res.data.code==200){
                        this.visitedUser=res.data.data;
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            find(userId){
                this.$http.get('http://localhost:1234/user/findById/'+userId).then((res)=>{
                    if(res.data.code==200){
                        this.user=res.data.data;
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            findTeamUser(){
                this.$http.get('http://localhost:1234/user/teamUser/').then((res)=>{
                    if(res.data.code==200){
                        this.teamUsers=res.data.data;
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            save(){
                let obj={user_id:this.user._id,visit_ids:this.visitedUser};
                this.$http.post('http://localhost:1234/userVisit/insert/',obj).then((res)=>{
                    if(res.data.code==200){
                        alert('保存成功！')
                    }
                },(err)=>{
                    console.log(err)
                })
            },
            cancel(){
                this.findVisits(this.$route.params.userId)
            }
        }
    }
</script>