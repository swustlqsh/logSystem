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
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">{{item.create_date|date}}</h3>
                </div>
                <div class="panel-body" style="height: 200px;overflow: auto">
                    {{{item.content}}}
                </div>
            </div>
        </div>
        </div>
        <div class="col-lg-12" v-if="this.pagination.last_page>1">
            <div class="pull-right">
                <pagination :pagination="pagination" :callback="findDairyByUser" :offset="8"></pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import dairyService from '../services/dairy'
    export default{
        http:{
            headers: {
                Authorization: sessionStorage.getItem('user')
            }
        },
        ready(){
            this.find(this.$route.params.userId);
            this.findDairyByUser();
        },
        data(){
            return{
                user:{},//user
                list:[],//user 日志
                pagination: {
                    total: 0, per_page: 16,
                    from: 0, to: 1,
                    current_page: 1,
                    last_page: 1
                },
                paginate: 1
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
            findDairyByUser(){
                var data = {
                    per_page: this.pagination.per_page,
                    current_page: this.pagination.current_page,
                    userId: this.$route.params.userId
                };
                dairyService.findDairyByUser(this,data,(data)=>{
                    this.list=data.data;
                    this.pagination.total = data.sum;
                    if(data.sum>this.pagination.per_page){
                        this.pagination.last_page = (this.pagination.total % this.pagination.per_page) == 0 ? (this.pagination.total / this.pagination.per_page):(this.pagination.total / this.pagination.per_page)+1
                    }else{
                        this.pagination.last_page=1;
                    }
                })
            }
        },
        components: {
            pagination: require('vue-bootstrap-pagination')
        }
    }
</script>