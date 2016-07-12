<template>
     <div class="list-left">
            <div class="logo">
                <span>TopxGun工作日志 <sub>Beta</sub></span>
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
     <div class="list-right">
            <div class="add-title">
                <div class="add-date" v-if="list.length<1">
                    暂无日志
                </div>
                <div class="add-date" v-if="list.length>0">
                    {{dairy.create_date|date}}
                </div>
                <div class="add-bts" v-show="dairy.create_date>this.zeroTime">
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
    export default{
        ready(){
            //日期选择器
            var $showDatePicker = $('.datepicker-here');
            $showDatePicker.datepicker({
                position: "right bottom",
                language: "zh_CN",
                onSelect:  (fd, date, obj)=> {
                    if(date){
                        let dateObj={userId:this.$route.params.userId,selectDate:date};
                        listService.findByDate(this,dateObj,(data)=>{
                            this.list=data;
                            setTimeout(()=>{
                                this.lookInfo(0);
                            },100);
                        })
                    }else{
                        this.findByUser()
                    }
                    obj.hide();
                }
            });
            $('.js-calendar').on('click',() =>{
                if(this.$route.name=='dairy'){
                    confirm('请在日志列表页面进行此操作^_^')
                }else if(this.$route.name=='user'){
                    if (!$showDatePicker.isFocus){
                        $showDatePicker.trigger('focus');
                    }
                }
            });
            $('#datepickers-container').on('mouseleave',()=>{
                $showDatePicker.trigger('blur');
            });
            //富文本编辑器初始化
            this.editor = new Simditor({
                textarea: $('#editor')
            });
            //列表内容初始化
            this.findByUser();
            //为了避免主机上的时间不准，获取服务器的时间（今日零点）来判断是否是今天的日志，如果是，可修改，显示‘完成’按钮
            listService.getZeroTime(this,(data)=>{
                this.zeroTime=data;
            })
        },
        data(){
            return{
                list:[],//列表数组
                dairy:{create_date:'',content:''}//查看的某条日志内容
            }
        },
        filters: {
            // 2016/07/10 格式的时间
            date(date){
                let d = new Date(date);
                let year = d.getFullYear();
                let month = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
                let da = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
                return year + '/' + month + '/' + da;
            }
        },
        methods:{
            //根据userID获取日志列表
            findByUser(){
                listService.findByUser(this,this.$route.path.split('/')[2],(data)=>{
                    this.list=data;
                    setTimeout(()=>{
                        this.lookInfo(0);
                    },100);
                })
            },
            //当查看某一项的时候背景颜色改变将查看的日志内容赋值给this.dairy
            // index--列表的第几项
            lookInfo(index){
                console.log(index);
                console.log($('#list li'));
                $('#list li').children('div').removeClass('list-active');
                $('#list li').eq(index).children('div').addClass('list-active');
                if(this.list&&this.list.length>0){
                    this.dairy=this.list[index];
                    this.editor.setValue(this.list[index].content);
                }else{
                    this.dairy={create_date:'',content:''};
                    this.editor.setValue('');
                }
            },
            //更新今天的日志。
            update(){
                let obj={_id:this.dairy._id,content:this.editor.getValue()};
                listService.updateDairy(this,obj,()=>{
                    this.findByUser();
                })
            }
        }
    }
</script>
<style>
    @import "../css/list.css";
</style>