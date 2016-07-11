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
                <div class="add-date">
                    {{dairy.create_date|date}}
                </div>
                <div class="add-bts">
                    <button @click="insert()">完成</button>
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
            this.editor = new Simditor({
                textarea: $('#editor')
            });
            this.findByUser();
        },
        data(){
            return{
                list:[],
                dairy:{create_date:'',content:''}
            }
        },
        filters: {
            date(date){
                let d = new Date(date);
                let year = d.getFullYear();
                let month = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
                let da = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
                return year + '/' + month + '/' + da;
            }
        },
        methods:{
            findByUser(){
                listService.findByUser(this,this.$route.path.split('/')[2],(res)=>{
                    this.list=res.data.data;
                    this.lookInfo(0);
                })
            },
            lookInfo(index){
                $('#list li').children('div').removeClass('list-active');
                $('#list li').eq(index).children('div').addClass('list-active');
                if(this.list&&this.list.length>0){
                    this.dairy=this.list[index];
                    this.editor.setValue(this.list[index].content);
                }
            }
        }
    }
</script>
<style>
    @import "../css/list.css";
</style>