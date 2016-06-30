<template>
    <div id="teamList" class="list-group col-md-3 outBorder">
        <button class="btn btn-info" @click="insert()" style="margin: 15px">添加部门</button>
        <a id="111111111111111111111111" class="list-group-item inBorder bg-grey" @click="activeChange('111111111111111111111111')">
            <span @click="activeChange('111111111111111111111111')" class="hand">topxgun</span>
        </a>
        <a id='{{team._id}}' class="list-group-item inBorder" v-for="team in teams">
            <span @click="activeChange(team._id)" class="hand">{{team.name}}</span>
            <span class="pull-right text-info hand" @click="remove(team._id)">删除&nbsp;&nbsp;</span>
            <span class="pull-right text-info hand" @click="update(team)">修改&nbsp;&nbsp;</span>
        </a>
    </div>
    <div class="col-md-9" style="margin-top: 20px">
        <table id="userTable" class="table table-hover">
            <thead>
                <tr>
                    <th>昵称</th>
                    <th>邮箱</th>
                    <th>所属部门</th>
                    <th>最后一次登录时间</th>
                    <th>操作&nbsp;&nbsp;&nbsp;<button class="btn btn-info btn-sm" @click="insertUser()">添加</button></th>
                </tr>
            </thead>
            <tbody id="userTbody">
                <tr  v-for="user in users" id="{{user._id}}">
                    <td>{{user.name?user.name:'匿名用户'}}</td>
                    <td>{{user.email}}</td>
                    <td>{{(user.team&&user.team.name)?user.team.name:'未设置'}}</td>
                    <td v-if="user.last_login">{{user.last_login|date}}</td>
                    <td v-if="!user.last_login">未登录</td>
                    <td>
                        <button class="btn btn-info btn-sm" @click="updateUser(user)">编辑</button>
                        <button class="btn btn-info btn-sm">查看日志</button>
                        <button class="btn btn-danger btn-sm" @click="removeUser(user._id)">删除</button>
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
           this.findUsers(this.activeTeam);
        },
        data () {
            return {
                teams:[],
                users:[],
                user:{},
                activeTeam:'111111111111111111111111'
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
            update(team){
                if(document.getElementById('temp')==undefined){
                    let _this=this;
                    let text=document.getElementById(team._id);
                    text.innerHTML="<input type='text' id='temp' value="+team.name+">" +
                            "<span id='cancel' class='pull-right text-info hand'>取消&nbsp;&nbsp;</span>" +
                            "<span id='confirm' class='pull-right text-info hand'>确定&nbsp;&nbsp;</span>";
                    document.getElementById('cancel').addEventListener('click',()=>{
                        _this.find();
                    });
                    document.getElementById('confirm').addEventListener('click',()=>{
                        if(temp.value==''){
                            alert('请填写部门名称！')
                        }else{
                            let teamObj={_id:team._id,name:temp.value};
                            _this.$http.post('http://localhost:1234/team/update',teamObj).then((res) => {
                                if(res.data.code==200){
                                    _this.find();
                                    _this.findUsers(this.activeTeam);
                                }
                            },(err) => {
                                console.log(err);
                            });
                        }
                    })
                }else{
                    alert('其他部门有编辑操作，请不要同时操作！')
                }
            },
            insert(){
                var newA=document.createElement('a');
                newA.setAttribute('class','list-group-item inBorder');
                newA.innerHTML="<input type='text' id='insertTemp'>" +
                        "<span id='insertCancel' class='pull-right text-info hand'>取消&nbsp;&nbsp;</span>" +
                        "<span id='insertConfirm' class='pull-right text-info hand'>确定&nbsp;&nbsp;</span>";
                if(this.teams[0]&&this.teams[0]._id){
                    let aFirst=document.getElementById(this.teams[0]._id);
                    document.getElementById('teamList').insertBefore(newA,aFirst);
                }else{
                    document.getElementById('teamList').appendChild(newA);
                }
                document.getElementById('insertCancel').addEventListener('click',()=>{
                    document.getElementById('teamList').removeChild(document.getElementById('teamList').children[2]);
                    this.find();
                });
                document.getElementById('insertConfirm').addEventListener('click',()=>{
                    let name=document.getElementById('insertTemp').value;
                    if(!name){
                        alert('请完善信息！')
                    }else{
                        let teamObj={name:name};
                        this.$http.post('http://localhost:1234/team/insert',teamObj).then((res)=>{
                            if(res.data.code==200){
                                document.getElementById('teamList').removeChild(document.getElementById('teamList').children[2]);
                                this.find();
                            }
                        },(err)=>{
                            console.log(err);
                        })
                    }
                });
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
            },
            findUsers(teamId){
                this.$http.get('http://localhost:1234/user/findByTeam/'+teamId).then((res) => {
                    if(res.data.code==200){
                        this.users=res.data.data;
                    }
                },(err) => {
                    console.log(err);
                });
            },
            insertUser(){
                if(document.getElementById('td0')==undefined){
                    let tr=document.getElementById('userTbody').insertRow(0);
                    let td0=tr.insertCell(0);
                    let td1=tr.insertCell(1);
                    let td2=tr.insertCell(2);
                    let td3=tr.insertCell(3);
                    let td4=tr.insertCell(4);
                    let options='<option value="">--请选择--</option>';
                    let teams=this.teams;
                    for(let i of teams){
                        options+='<option value="'+i._id+'">'+i.name+'</option>'
                    }
                    td0.innerHTML='<input type="text" id="td0">';
                    td1.innerHTML='<input type="text" id="td1">';
                    td2.innerHTML='<select id="select">' + options+ '</select>';
                    td4.innerHTML='<button class="btn btn-info btn-sm" id="userConfirm">确定</button>&nbsp;' +
                            '<button class="btn btn-info btn-sm" id="userCancel">取消</button>';
                    document.getElementById('userConfirm').addEventListener('click',()=>{
                        let value0=document.getElementById('td0').value;
                        let value1=document.getElementById('td1').value;
                        let value2=document.getElementById('select').value;
                        if(value0&&value1&&value2){
                            let userObj={name:value0,email:value1,team:value2};
                            this.$http.post('http://localhost:1234/user/insert',userObj).then((res)=>{
                                if(res.data.code==200){
                                    document.getElementById('userTbody').deleteRow(0);
                                    this.findUsers(this.activeTeam);
                                }
                            },(err)=>{
                                console.log(err);
                            })
                        }else{
                            alert('请完善信息！')
                        }
                    });
                    document.getElementById('userCancel').addEventListener('click',()=>{
                        document.getElementById('userTbody').deleteRow(0);
                        this.findUsers(this.activeTeam);
                    });
                }else{
                    alert('有其他添加员工操作，请不要同时操作！')
                }
            },
            activeChange(id){
                document.getElementById(this.activeTeam).setAttribute('class','list-group-item inBorder');
                this.activeTeam=id;
                document.getElementById(this.activeTeam).setAttribute('class','list-group-item inBorder bg-grey');
                this.findUsers(this.activeTeam)
            },
            updateUser(user){
                if(document.getElementById('userUpdateTd0')==undefined) {
                    let tds = document.getElementById(user._id).children;
                    let teams = this.teams;
                    let options = '<option value="">--请选择--</option>';
                    for (let i of teams) {
                        if (user.team && (i._id == user.team._id)) {
                            options += '<option selected value="' + i._id + '">' + i.name + '</option>'
                        } else {
                            options += '<option value="' + i._id + '">' + i.name + '</option>'
                        }
                    }
                    tds[0].innerHTML = "<input type='text' id='userUpdateTd0' value='" + user.name + "'>";
                    tds[1].innerHTML = "<input type='text' id='userUpdateTd1' value='" + user.email + "'>";
                    tds[2].innerHTML = '<select id="userUpdateTd2">' + options + '</select>';
                    tds[4].innerHTML = '<button class="btn btn-info btn-sm" id="userUpdateConfirm">确定</button>&nbsp;' +
                            '<button class="btn btn-info btn-sm" id="userUpdateCancel">取消</button>';
                    document.getElementById('userUpdateConfirm').addEventListener('click', ()=> {
                        let value0 = document.getElementById('userUpdateTd0').value;
                        let value1 = document.getElementById('userUpdateTd1').value;
                        let value2 = document.getElementById('userUpdateTd2').value;
                        if (value0 && value1 && value2) {
                            let userObj = {_id: user._id, name: value0, email: value1, team: value2};
                            this.$http.post('http://localhost:1234/user/update', userObj).then((res)=> {
                                if (res.data.code == 200) {
                                    this.findUsers(this.activeTeam);
                                }
                            }, (err)=> {
                                console.log(err);
                            })
                        } else {
                            alert('请完善信息！')
                        }
                    });
                    document.getElementById('userUpdateCancel').addEventListener('click', ()=> {
                        this.findUsers(this.activeTeam);
                    });
                }else{
                    alert('其他员工有编辑操作，请不要同时操作！')
                }
            },
            removeUser(userId){
                this.$http.delete('http://localhost:1234/user/'+userId).then((res)=>{
                   if(res.data.code==200){
                        this.findUsers(this.activeTeam);
                    }
                },(err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>