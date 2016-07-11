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
                console.log('123');
                listService.findByUser(this,this.$route.path.split('/')[2]);
            }
        }
    }
</script>
<style>
    .list-left{
        width: 357px;
        height: 100%;
        float: left;
        border-right: 2px solid #EAEAEA;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .logo {
        width: 356px;
        height: 122px;
        font-family: "黑体", serif;
        font-size: 20px;
        color: #C3C3C3;
        position: relative;
    }
    .logo span {
        display: block;
        margin: 20px;
    }
    .log-item {
        width: 357px;
        height: 166px;
        border-top: 2px solid #EAEAEA;
        color: rgba(155, 155, 155, 1);
        font-family: "黑体", serif;
        font-size: 15px;
    }
    .log-item:hover {
        background-color: #0078DB;
        color: #fff;
    }
    .log-item .item-header {
        margin-left: 17px;
        margin-top: 14px;
        margin-right: 24px;
    }
    .item-content {
        width: 314px;
        height: 110px;
        margin: 15px auto 0;
        font-size: 13px;
        overflow: hidden;
        word-break: break-all;
        line-height: 16px;
    }
    .list-left ul li:last-child{
        border-bottom: 2px solid #EAEAEA;
    }
    .list-left::-webkit-scrollbar {
        width: 7px;
    }
    .list-left::-webkit-scrollbar-track {
        background-color: #fff;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
    .list-left::-webkit-scrollbar-thumb {
        background-color: rgba(74, 74, 74, 0.58);
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
    .list-right{
        float: left;
        position: absolute;
        margin-left: 357px;
        top:30px;
        left: 25px;
        right: 25px;
        bottom: 0;
    }
</style>