<template>
    <div id="teamList" class="list-group col-md-3 border leftBorder">
        <button class="btn btn-info margin15" @click="insert()">添加部门</button>
        <a id="111111111111111111111111" class="list-group-item inBorder bg-grey">
            <span @click="activeChange('111111111111111111111111')" class="hand">topxgun</span>
        </a>
        <a id='{{team._id}}' :class="[defaultStyle]" v-for="team in teams">
            <span @click="activeChange(team._id)" class="hand">{{team.name}}</span>
            <span class="pull-right text-info hand" @click="remove(team._id)">删除&nbsp;&nbsp;</span>
            <span class="pull-right text-info hand" @click="update(team)">修改&nbsp;&nbsp;</span>
        </a>
    </div>
    <div class="col-lg-offset-3 col-md-9 top20">
        <table id="userTable" class="table table-hover">
            <thead>
            <tr>
                <th>昵称</th>
                <th>邮箱</th>
                <th>所属部门</th>
                <th>最后一次登录时间</th>
                <th>操作&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-info btn-sm" @click="insertUser()">添加</button>
                </th>
            </tr>
            </thead>
            <tbody id="userTbody">
            <tr v-for="user in users" id="{{user._id}}">
                <td>{{user.name?user.name:'匿名用户'}}</td>
                <td>{{user.email}}</td>
                <td>{{(user.team&&user.team.name)?user.team.name:'未设置'}}</td>
                <td v-if="user.last_login">{{user.last_login|dateWithSecond}}</td>
                <td v-if="!user.last_login">未登录</td>
                <td>
                    <button class="btn btn-info btn-sm" @click="updateUser(user)">编辑</button>
                    <a class="btn btn-info btn-sm" v-link="{name:'dairy',params:{userId:user._id}}">查看日志</a>
                    <a class="btn btn-info btn-sm" v-link="{name:'auth',params:{userId:user._id}}">访问日志权限</a>
                    <button class="btn btn-danger btn-sm" @click="removeUser(user._id)">删除</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="this.pagination.last_page>1">
            <div class="pull-right">
                <pagination :pagination="pagination" :callback="findUsers" :offset="8"></pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import listService from '../services/list'
    export default{
        ready() {

            this.find();
            this.findUsers();
        },
        data () {
            return {
                teams: [],
                users: [],
                user: {},
                activeTeam: '111111111111111111111111',
                defaultStyle:'list-group-item inBorder',
                defaultStyleActive:'list-group-item inBorder bg-grey',
                pagination: {
                    total: 0, per_page: 50,
                    from: 0, to: 1,
                    current_page: 1,
                    last_page: 1
                },
                paginate: 1
            }
        },
        methods: {
            find(){
                listService.findTeam(this,(data)=>{
                    this.teams=data;
                });
            },
            update(team){
                if (document.getElementById('temp') == undefined) {
                    let _this = this;
                    let text = document.getElementById(team._id);
                    text.innerHTML = "<input type='text' id='temp' size='20' maxlength='20' placeholder='最大20字符' value=" + team.name + ">" +
                            "<span id='cancel' class='pull-right text-info hand'>取消&nbsp;&nbsp;</span>" +
                            "<span id='confirm' class='pull-right text-info hand'>确定&nbsp;&nbsp;</span>";
                    document.getElementById('cancel').addEventListener('click', ()=> {
                        _this.find();
                    });
                    document.getElementById('confirm').addEventListener('click', ()=> {
                        if (temp.value == '') {
                            alert('请填写部门名称！')
                        } else {
                            let teamObj = {_id: team._id, name: temp.value};
                            listService.updateTeam(_this,teamObj,(data)=>{
                                _this.find();
                                _this.findUsers(this.activeTeam);
                            })
                        }
                    })
                } else {
                    alert('其他部门有编辑操作，请不要同时操作！')
                }
            },
            insert(){
                if (document.getElementById('insertTemp') == undefined) {
                    var newA = document.createElement('a');
                    newA.setAttribute('class', 'list-group-item inBorder');
                    newA.innerHTML = "<input type='text' size='20' maxlength='20' placeholder='最大20字符' id='insertTemp'>" +
                            "<span id='insertCancel' class='pull-right text-info hand'>取消&nbsp;&nbsp;</span>" +
                            "<span id='insertConfirm' class='pull-right text-info hand'>确定&nbsp;&nbsp;</span>";
                    if (this.teams[0] && this.teams[0]._id) {
                        let aFirst = document.getElementById(this.teams[0]._id);
                        document.getElementById('teamList').insertBefore(newA, aFirst);
                    } else {
                        document.getElementById('teamList').appendChild(newA);
                    }
                    document.getElementById('insertCancel').addEventListener('click', ()=> {
                        document.getElementById('teamList').removeChild(document.getElementById('teamList').children[2]);
                        this.find();
                    });
                    document.getElementById('insertConfirm').addEventListener('click', ()=> {
                        let name = document.getElementById('insertTemp').value;
                        if (!name) {
                            alert('请填写部门名称！')
                        } else {
                            let teamObj = {name: name};
                            listService.insertTeam(this,teamObj,(data)=>{
                                document.getElementById('teamList').removeChild(document.getElementById('teamList').children[2]);
                                this.find();
                            })
                        }
                    });
                } else {
                    alert('有其他添加部门的操作，请不要同时进行操作！')
                }
            },
            remove(teamId){
                listService.removeTeam(this,teamId,(data)=>{
                    this.find();
                });
            },
            findUsers(){
                var data = {
                    per_page: this.pagination.per_page,
                    current_page: this.pagination.current_page,
                    teamId: this.activeTeam,
                    token:sessionStorage.getItem('user')
                };
                listService.findUsers(this,data,(data)=>{
                    this.users = data.data;
                    this.pagination.total = data.sum;
                    if(data.sum>this.pagination.per_page){
                        this.pagination.last_page = (this.pagination.total % this.pagination.per_page) == 0 ? (this.pagination.total / this.pagination.per_page):(this.pagination.total / this.pagination.per_page)+1
                    }else{
                        this.pagination.last_page=1;
                    }
                })
            },
            insertUser(){
                if (document.getElementById('td0') == undefined) {
                    let tr = document.getElementById('userTbody').insertRow(0);
                    let td0 = tr.insertCell(0);
                    let td1 = tr.insertCell(1);
                    let td2 = tr.insertCell(2);
                    let td3 = tr.insertCell(3);
                    let td4 = tr.insertCell(4);
                    let options = '<option value="">--请选择--</option>';
                    let teams = this.teams;
                    for (let i of teams) {
                        options += '<option value="' + i._id + '">' + i.name + '</option>'
                    }
                    td0.innerHTML = '<input type="text" size="20" placeholder="最大20字符" maxlength="20" id="td0">';
                    td1.innerHTML = '<input type="email" size="30" placeholder="最大30字符" maxlength="30" id="td1">';
                    td2.innerHTML = '<select id="select">' + options + '</select>';
                    td4.innerHTML = '<button class="btn btn-info btn-sm" id="userConfirm">确定</button>&nbsp;' +
                            '<button class="btn btn-info btn-sm" id="userCancel">取消</button>';
                    document.getElementById('userConfirm').addEventListener('click', ()=> {
                        let value0 = document.getElementById('td0').value;
                        let value1 = document.getElementById('td1').value;
                        let value2 = document.getElementById('select').value;
                        if (value0 && value1 && value2) {
                            let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if (!value1.match(reg)) {
                                alert('邮箱不匹配！')
                            } else {
                                let userObj = {name: value0, email: value1, team: value2};
                                listService.insertUser(this,userObj,(data)=>{
                                    document.getElementById('userTbody').deleteRow(0);
                                    this.findUsers(this.activeTeam);
                                })
                            }
                        } else {
                            alert('请完善信息！')
                        }
                    });
                    document.getElementById('userCancel').addEventListener('click', ()=> {
                        document.getElementById('userTbody').deleteRow(0);
                        this.findUsers(this.activeTeam);
                    });
                } else {
                    alert('有其他添加员工操作，请不要同时操作！')
                }
            },
            activeChange(id){
                document.getElementById(this.activeTeam).setAttribute('class', this.defaultStyle);
                this.activeTeam = id;
                document.getElementById(this.activeTeam).setAttribute('class', this.defaultStyleActive);
                this.findUsers(this.activeTeam)
            },
            updateUser(user){
                if (document.getElementById('userUpdateTd0') == undefined) {
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
                    tds[0].innerHTML = "<input type='text' size='20' maxlength='20' placeholder='最大20字符' id='userUpdateTd0' value='" + user.name + "'>";
                    tds[1].innerHTML = "<input type='email' size='30' maxlength='30' placeholder='最大30字符' id='userUpdateTd1' value='" + user.email + "'>";
                    tds[2].innerHTML = '<select id="userUpdateTd2">' + options + '</select>';
                    tds[4].innerHTML = '<button class="btn btn-info btn-sm" id="userUpdateConfirm">确定</button>&nbsp;' +
                            '<button class="btn btn-info btn-sm" id="userUpdateCancel">取消</button>';
                    document.getElementById('userUpdateConfirm').addEventListener('click', ()=> {
                        let value0 = document.getElementById('userUpdateTd0').value;
                        let value1 = document.getElementById('userUpdateTd1').value;
                        let value2 = document.getElementById('userUpdateTd2').value;
                        if (value0 && value1 && value2) {
                            let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if (!value1.match(reg)) {
                                alert('邮箱不匹配！')
                            } else {
                                let userObj = {_id: user._id, name: value0, email: value1, team: value2};
                                listService.updateUser(this,userObj,(data)=>{
                                    this.findUsers(this.activeTeam);
                                })
                            }
                        } else {
                            alert('请完善信息！')
                        }
                    });
                    document.getElementById('userUpdateCancel').addEventListener('click', ()=> {
                        this.findUsers(this.activeTeam);
                    });
                } else {
                    alert('其他员工有编辑操作，请不要同时操作！')
                }
            },
            removeUser(userId){
                if(confirm('确认删除？')){
                    listService.removeUser(this,userId,(data)=>{
                        this.findUsers(this.activeTeam);
                    })
                }
            }
        },
        components: {
            pagination: require('vue-bootstrap-pagination')
        }
    }
</script>