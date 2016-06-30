<template>
    <div class="list-group col-md-3 outBorder">
        <button class="btn btn-info" @click="insert()" style="margin: 15px">添加部门</button>
        <a id="user{{$index}}" class="list-group-item inBorder" v-for="team in teams">{{team.name}}
            <span class="pull-right text-info hand" @click="remove(team._id)">删除&nbsp;&nbsp;</span>
            <span class="pull-right text-info hand" @click="updateTeam($index,team)">修改&nbsp;&nbsp;</span>
        </a>
    </div>
    <div class="col-md-9" style="margin-top: 20px">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>昵称</th>
                    <th>邮箱</th>
                    <th>所属部门</th>
                    <th>最后一次登录时间</th>
                    <th>操作&nbsp;&nbsp;&nbsp;<button class="btn btn-info btn-sm">添加</button></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td>{{user.name?user.name:'匿名用户'}}</td>
                    <td>{{user.email}}</td>
                    <td>未设置</td>
                    <td>{{user.last_login|date}}</td>
                    <td>
                        <button class="btn btn-info btn-sm">编辑</button>
                        <button class="btn btn-info btn-sm">查看日志</button>
                        <button class="btn btn-danger btn-sm">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        ready() {
           this.find();
           this.findUsers();
        },
        data () {
            return {
                teams:[],
                users:[]
            }
        },
        filters:{
            date(date){
                let d=new Date(date);
                let year=d.getFullYear();
                let month=d.getMonth()>8?d.getMonth()+1:'0'+(d.getMonth()+1);
                let da=d.getDate()>9?d.getDate():'0'+d.getDate();
                let hour=d.getHours()>9?d.getHours():'0'+d.getHours();
                let min=d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes();
                let sec=d.getSeconds()>9?d.getSeconds():'0'+d.getSeconds();
                return year+'-'+month+'-'+da+' '+hour+':'+min+':'+sec;
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
            findUsers(){
                this.$http.get('http://localhost:1234/user/find').then((res) => {
                    if(res.data.code==200){
                        this.users=res.data.data;
                    }
                },(err) => {
                    console.log(err);
                });
            },
            updateTeam($index,team){
                if(document.getElementById('temp')==undefined){
                    let _this=this;
                    let text=document.getElementById('user'+$index);
                    text.innerHTML="<input type='text' id='temp' value="+team.name+">" +
                            "<span id='cancel' class='pull-right text-info hand'>取消&nbsp;&nbsp;</span>" +
                            "<span id='confirm' class='pull-right text-info hand'>确定&nbsp;&nbsp;</span>";
                    document.getElementById('cancel').addEventListener('click',()=>{
                        _this.find();
                    });
                    document.getElementById('confirm').addEventListener('click',()=>{
                        let teamObj={_id:team._id,name:temp.value};
                        _this.$http.post('http://localhost:1234/team/update',teamObj).then((res) => {
                            if(res.data.code==200){
                                _this.find();
                            }
                        },(err) => {
                            console.log(err);
                        });
                    })
                }else{
                    alert('其他部门有编辑操作，请不要同时操作！')
                }
            },
            insert(){
                let teamObj={name:'默认部门'};
                this.$http.post('http://localhost:1234/team/insert',teamObj).then((res)=>{
                    if(res.data.code==200){
                        this.find();
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            remove(teamId){
                this.$http.delete('http://localhost:1234/team/'+teamId).then((res)=>{
                    if(res.data.code==203){
                        alert('此部门下有员工，不可删除！')
                    }else if(res.data.code==200){
                        this.find();
                    }
                },(err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>