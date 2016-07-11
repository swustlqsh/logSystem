<template>
     <div class="list-left">
            <div class="logo">
                <span>TopxGun工作日志 <sub>Beta</sub></span>
            </div>
            <ul>
                <li v-for="item in list">
                    <div class="log-item">
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
                    2016/09/08
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
    import listService from '../services/list'
    export default{
        ready(){
            var editor = new Simditor({
                textarea: $('#editor')
            });
            this.findByUser();
        },
        data(){
            return{
                list:[]
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
                listService.findByUser(this,this.$route.path.split('/')[2]);
            }
        }
    }
</script>
<style>
    @import "../css/list.css";
</style>