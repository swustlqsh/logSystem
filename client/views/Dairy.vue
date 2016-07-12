<template>
    <div class="panel-main-content">
        <div class="add-log">
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
    </div>
</template>
<script type="text/ecmascript-6">
    import dairyService from '../services/dairy'
    export default{
        ready(){
            //富文本编辑器
            var editor = new Simditor({
                textarea: $('#editor')
            });
            //为了避免主机上的时间不准，获取服务器的时间（今日零点）来判断是否有今天的日志
            dairyService.insertDairy(this,this.$route.params.userId,()=>{
                confirm('今天你已经写了日志，不可以重复写，直接修改就可以喽~');
                $('.js-add').removeClass('log-options-active');
                this.$router.go({name:'user',params:{userId:this.$route.params.userId}});
            });
        },
        methods:{
            //添加日志
            insert(){
                let dairyObj={user_id:this.$route.params.userId,content:document.getElementById('editor').value};
                dairyService.insert(this,dairyObj,()=>{
                    this.$router.go({name:'user',params:{userId:this.$route.params.userId}});
                    $('.js-add').removeClass('log-options-active');
                });
            }
        }
    }
</script>
<style>
    @import "../css/dairy.css";
</style>