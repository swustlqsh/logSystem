<template>
    <!--日志列表-->
    <div class="list-left js-log-list">
        <div class="logo" v-if="selectedUser.name == undefined">
            <span>TopxGun工作日志 <sub>Beta</sub></span>
        </div>

        <!--TODO 需要修改 <br>太恶心-->
        <div class="logo" style="background:#393D41;" v-else>
            <br>
            <span style="color:#fff;display:inline;">TopxGun工作日志 <sub style="color:#c3c3c3">Beta</sub></span>
            <br>
            <br>
            <img src="../imgs/empl_active.png" style="margin-left:20px;vertical-align: middle;">
            <span style="display:inline;vertical-align:middle;">{{selectedUser.name}}</span>
        </div>
        <ul id="list">
            <li v-for="item in list">
                <div class="log-item" @click="lookInfo($index)">
                    <div class="item-header">
                        <span class="text-date">{{item.create_date|date}}</span>
                    </div>
                    <div class="item-content">
                        {{{item.content}}}
                    </div>
                </div>
            </li>
        </ul>
    </div>

    <!--部门列表-->
    <div class="list-left js-dept-list" style="display: none; border:none;">
        <div class="logo logo-dept">
            <span>部门</span>
        </div>
        <ul>
            <li  v-for="item in deptList" class="dept-item js-dept-item" @click="findUserByTeam($index)">
                <div>
                    <img src="../imgs/ic_folder.png" alt="部门小图标">
                    <span>{{item.name}}</span>
                </div>
            </li>
        </ul>
    </div>


    <!--部门员工列表-->
    <div class="list-left js-empl-list" style="display: none;border:none">
        <div class="logo logo-dept">
            <span>{{dept}}</span>
            <img class="js-back-dept" src="../imgs/back.png">
        </div>
        <ul >
            <li v-for="user in userList" class="dept-item js-user-item" @click="showUserLog($index)">
                <div>
                    <img src="../imgs/ic_person.png" alt="员工小图标">
                    <span>{{user.name}}</span>
                </div>
            </li>
        </ul>
    </div>


    <!--日志富文本编辑器-->
    <div class="list-right">
        <div class="add-title">
            <div class="add-date" v-if="list.length<1">
                暂无日志
            </div>
            <div class="add-date" v-if="list.length>0">
                {{dairy.create_date|date}}
            </div>
            <div class="add-bts" v-show="dairy.create_date>this.zeroTime && this.selectedUser.name==undefined">
                <button @click="update()">完成</button>
            </div>
        </div>
        <div class="editor">
            <textarea id="editor" placeholder="请输入日志内容。。。" autofocus></textarea>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import listService from '../services/list';
    import dairyService from '../services/dairy';
    export default{
        ready(){
            //日期选择器
            var $showDatePicker = $('.datepicker-here');
            $showDatePicker.datepicker({
                position: "right bottom",
                language: "zh_CN",
                onSelect: (fd, date, obj)=> {
                    if (date) {
                        let dateObj = {userId: this.$route.params.userId, selectDate: date};
                        listService.findByDate(this, dateObj, (data)=> {
                            this.list = data;
                            setTimeout(()=> {
                                this.lookInfo(0);
                            }, 100);
                        })
                    } else {
                        this.findByUser()
                    }
                    obj.hide();
                }
            });
            $('.js-calendar').unbind('click').on('click', () => {
                if (this.$route.name == 'dairy') {
                    swal(
                            '系统提示!',
                            '请在日志列表页面进行此操作^_^',
                            'error'
                    );
                } else if (this.dept != "" || this.selectedUser._id != undefined || !$('.js-dept-list').is(':hidden')) {
                    swal(
                            '系统提示!',
                            '暂时只支持搜索自己的日志信息',
                            'error'
                    );

                } else {
                    if (!$showDatePicker.isFocus) {
                        $showDatePicker.trigger('focus');
                    }
                }
            });
            $('#datepickers-container').on('mouseleave', ()=> {
                $showDatePicker.trigger('blur');
            });
            dairyService.getToken(this,(token)=>{
                //拿到token后富文本编辑器初始化
                this.editor = new Simditor({
                    textarea: $('#editor'),
                    placeholder: "请输入日志内容。。。",
                    toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale',
                        'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr',
                        'indent', 'outdent', 'alignment'
                    ],
                    defaultImage: '../imgs/header.png',
                    upload: {
                        url: 'http://up.qiniu.com/', //文件上传的接口地址
                        params: {token: token}, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
                        fileKey: 'file', //服务器端获取文件数据的参数名
                        connectionCount: 3,
                        leaveConfirm: '正在上传文件'
                    }
                });
            });

            //日志列表内容初始化
            this.findByUser();
            //为了避免主机上的时间不准，获取服务器的时间（今日零点）来判断是否是今天的日志，如果是，可修改，显示‘完成’按钮
            listService.getZeroTime(this, (data)=> {
                this.zeroTime = data;
            })

            //部门选择
            var _this = this;
            $('.js-department').unbind('click').bind('click', ()=> {
                if (this.$route.name == 'dairy') {
                    swal(
                            '系统提示!',
                            '请在日志列表页面进行此操作^_^',
                            'error'
                    );
                    $('img[title="user"]').attr('src','../imgs/user.png');
                } else if (this.$route.name == 'user') {
                    _this.findTeamAuth();
                }
            });
            //选择员工时点击部门名称旁的后退按钮返回至选择部门页
            $('.js-back-dept').unbind('click').bind('click', ()=> {
                _this.showDept();
            });

        /*    //部门列表每一项hover事件
            $('.js-dept-item').hover(function(){
                $(this).css({ 'background-color': '#0078DB','color':'#fff'}).find('img').attr('src','../imgs/ic_folder_white.png').css('border','none');
            });
            //员工列表每一项hover事件
            $('.js-user-item').hover(function(){
                $(this).css({ 'background-color': '#0078DB','color':'#fff'}).find('img').attr('src','../imgs/ic_person_white.png').css('border','none');
            });*/

        },
        data(){
            return {
                list: [],//日志列表数组
                deptList: [],//部门列表数组
                userList: [], //部门中的人员列表数组
                dept: '',//在部门列表页选择的部门
                selectedUser: {},//通过点击部门 选中的某个用户
                dairy: {create_date: '', content: ''}//查看的某条日志内容
            }
        },
        methods: {
            //根据userID获取有权限能看到日志的部门
            findTeamAuth(){
                //如果当前部门列表是隐藏的且员工列表也是隐藏的且所选择的user为空，就显示部门列表，否则就显示日志列表
                if ($('.js-dept-list').is(":hidden") && $('.js-empl-list').is(":hidden") && this.selectedUser._id == undefined) {
                    listService.findTeamAuth(this, this.$route.path.split('/')[2], (data)=> {
                        this.deptList = data;
                    });

                    $('img[title="user"]').attr('src','../imgs/user_select.png').unbind('hover').hover(function () {
                        $(this).attr('src','../imgs/user_hover.png');
                    },function(){
                        $(this).attr('src','../imgs/user_select.png');
                    });

                    this.showDept();
                } else {
                    this.hideMask();
                    $('.list-left').hide();
                    this.selectedUser = {};
                    this.dept = "";
                    this.findByUser()
                    //编辑器恢复可用状态
                    $('.simditor-body').attr('contenteditable', 'true');
                    $('.simditor-toolbar').show();
                    $('.simditor-placeholder').text("请输入日志信息。。。");
                    $('.js-log-list').removeClass().addClass('list-left js-log-list animated  fadeInUp').show();

                    $('img[title="user"]').attr('src','../imgs/user.png').unbind('hover').hover(function () {
                        $(this).attr('src','../imgs/user_hover.png');
                    },function(){
                        $(this).attr('src','../imgs/user.png');
                    });

                }
            },
            //根据userID和teamID获取该部门下能看到所有用户
            findUserByTeam(index){
                this.dept = this.deptList[index].name;
                let obj = {user_id: this.$route.path.split('/')[2], team_id: this.deptList[index]._id}
                listService.findUserByTeam(this, obj, (data)=> {
                    this.userList = data;
                });
                this.showUser();
            },
            //显示遮罩层
            showMask(){
                $("#mask").css({"height": $(document).height(), "width": $(document).width()}).show();
            },
            //隐藏遮罩层
            hideMask(){
                $("#mask").hide();
            },
            //显示部门列表
            showDept(){
                this.hideMask();
                this.showMask();
                $('.list-left').hide();
                $('.js-dept-list').removeClass().addClass('list-left js-dept-list animated  fadeInUp').show();

            },
            //显示某一部门的员工列表
            showUser(){
                this.showMask();
                $('.list-left').hide();
                $('.js-empl-list').removeClass().addClass('list-left js-empl-list animated  fadeInUp').show().find('.logo span').text(this.dept);
            },

            //显示选中的某一个员工的日志信息
            showUserLog(index){
                this.hideMask();
                this.selectedUser = this.userList[index];
                listService.findByUser(this, this.userList[index]._id, (data)=> {
                    this.list = data;
                    $('.list-left').hide();
                    $('.js-log-list').removeClass().addClass('list-left js-log-list animated  fadeInUp').show();
                    //富文本编辑器设为不可用状态
                    $('.simditor-body').attr('contenteditable', 'false');
                    $('.simditor-toolbar').hide();
                    $('.simditor-placeholder').text("");
                    setTimeout(()=> {
                        this.lookInfo(0);
                    }, 100);
                });
            },

            //根据userID获取日志列表
            findByUser(){
                listService.findByUser(this, this.$route.path.split('/')[2], (data)=> {
                    this.list = data;
                    setTimeout(()=> {
                        this.lookInfo(0);
                    }, 100);
                })
            },
            //当查看某一项的时候背景颜色改变将查看的日志内容赋值给this.dairy
            // index--列表的第几项
            lookInfo(index){
                $('#list li').children('div').removeClass('list-active');
                $('#list li').eq(index).children('div').addClass('list-active');
                if (this.list && this.list.length > 0) {
                    this.dairy = this.list[index];
                    this.editor.setValue(this.list[index].content);
                } else {
                    this.dairy = {create_date: '', content: ''};
                    this.editor.setValue('');
                }
            },
            //更新今天的日志。
            update(){
                let obj = {_id: this.dairy._id, content: this.editor.getValue()};
                listService.updateDairy(this, obj, ()=> {
                    this.findByUser();
                })
            }
        }
    }

</script>
<style>
    @import "../css/list.css";
    @import "../css/animate.css";
</style>