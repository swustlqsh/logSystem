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
    import authService from '../services/auth'
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
                authService.findVisits(this,userId,(data)=>{
                    this.visitedUser=data;
                })
            },
            find(userId){
                authService.find(this,userId,(data)=>{
                    this.user=data;
                })
            },
            findTeamUser(){
                authService.findTeamUser(this,(data)=>{
                    this.teamUsers=data;
                })
            },
            save(){
                let obj={user_id:this.user._id,visit_ids:this.visitedUser};
                authService.save(this,obj);
            },
            cancel(){
                this.findVisits(this.$route.params.userId)
            }
        }
    }
</script>