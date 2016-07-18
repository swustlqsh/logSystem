<template>
    <div class="col-lg-offset-3 col-lg-6">
        <div class="col-lg-9">
            <h2><b><span class="text-info">{{user.name?user.name:'匿名用户'}}</span>的访问权限管理</b></h2>
        </div>
        <div class="col-lg-3 top20">
            <a class="btn btn-info btn-sm pull-right" v-link="{path:'/list'}">返回员工列表</a>
        </div>
        <div class="col-lg-12">
            <div v-for="team in teamUsers" class="top45">
                <h3 class="text-info">
                    <input type="checkbox" id="{{team._id}}" @click="checkAll(team._id)">
                    <b>{{team.name}}</b>
                </h3>
                <div v-if="team.items.length<1" class="left15">
                    <p>此部门暂无员工</p>
                </div>
                <div class="col-lg-12">
                    <div v-for="u in team.items" class="left15 left">
                        <input type="checkbox" id="{{u._id}}"  value="{{u._id}}" v-model="visitedUser" @click="isTeamAllCheck(u)">&nbsp;{{u.name}}
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
    const _=require('lodash');
    export default{
        http:{
            headers: {
                Authorization: sessionStorage.getItem('user')
            }
        },
        ready(){
            this.find(this.$route.params.userId);
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
                    //当刚进入授权页面或者刷新页面的时候，看一下某个部门是不是都是全选，如果是team--true,有一个false，team--false
                    this.teamUsers.forEach(item=>{
                        if(item.items.length>0){
                            var k=0;
                            item.items.forEach(i=>{
                                if(_.indexOf(this.visitedUser,i._id)==-1){
                                    document.getElementById(item._id).checked=false;
                                }else{
                                    k++;
                                    if(k==item.items.length){
                                        document.getElementById(item._id).checked=true;
                                    }
                                }
                            })
                        }else{
                            document.getElementById(item._id).checked=false;
                        }
                    })
                })
            },
            find(userId){
                authService.find(this,userId,(data)=>{
                    this.user=data;
                });
            },
            findTeamUser(){
                authService.findTeamUser(this,(data)=>{
                    this.teamUsers=data;
                    this.findVisits(this.$route.params.userId);
                });
            },
            save(){
                let obj={user_id:this.user._id,visit_ids:this.visitedUser};
                authService.save(this,obj);
            },
            cancel(){
                this.findVisits(this.$route.params.userId)
            },
            //一个部门全选
            checkAll(teamId){
                if(document.getElementById(teamId).checked){
                    authService.checkAll(this,teamId,data=>{
                        this.visitedUser=_.union(this.visitedUser,data);
                        data.map(item=>{
                            document.getElementById(item).checked=true;
                        });
                    })
                }else{
                    authService.checkAll(this,teamId,data=>{
                        this.visitedUser=_.pullAll(this.visitedUser,data);
                        data.map(item=>{
                            document.getElementById(item).checked=false;
                        });
                    })
                }
            },
            //当点击一个部门的员工的时候，如果这个员工false，team--false
            //如果员工true,判断是不是这个部门员工都是true。
            isTeamAllCheck(user){
                if(!document.getElementById(user._id).checked){
                    document.getElementById(user.team).checked=false
                }else{
                    let arr=this.teamUsers.find(item=>{
                        return item._id==user.team;
                    });
                    let brr=[];
                    arr.items.forEach(item=>{
                       if(document.getElementById(item._id).checked==true){
                           brr.push(item)
                       }
                    });
                    if(brr.length==arr.items.length){
                        document.getElementById(user.team).checked=true;
                    }
                }
            }
        }
    }
</script>