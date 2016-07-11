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
            var editor = new Simditor({
                textarea: $('#editor')
            });
        },
        methods:{
            insert(){
                let dairyObj={user_id:this.$route.params.userId,content:document.getElementById('editor').value};
                dairyService.insert(this,dairyObj,()=>{
                    this.$router.go({name:'user',params:{userId:this.$route.params.userId}});
                });
            }
        }
    }
</script>