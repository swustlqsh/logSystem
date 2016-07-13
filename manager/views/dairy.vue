<template>
    <div class="col-lg-12">
        <div class="col-lg-12">
            <div class="col-lg-9">
                <h2><b><span class="text-info">{{user.name?user.name:'匿名用户'}}的</span>日志</b></h2>
            </div>
            <div class="col-lg-3 top20">
                <a class="btn btn-info btn-sm pull-right" v-link="{path:'/list'}">返回员工列表</a>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="col-lg-3" v-for="item in list">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{item.create_date|date}}</h3>
                </div>
                <div class="panel-body" style="height: 200px;overflow: auto">
                    {{{item.content}}}
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import dairyService from '../services/dairy'
    export default{
        ready(){
            this.find(this.$route.params.userId);
            this.findDairyByUser(this.$route.params.userId);
        },
        data(){
            return{
                user:{},//user
                list:[]//user 日志
            }
        },
        methods:{
            //通过userid来获取当前查看的员工
            find(userId){
                dairyService.findUserById(this,userId,(data)=>{
                    this.user=data;
                });
            },
            //通过userid来获取当前员工的日志
            findDairyByUser(userId){
                dairyService.findDairyByUser(this,userId,(data)=>{
                    this.list=data;
                })
            }
        }
    }
</script>