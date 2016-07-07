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
    export default{
        ready(){
            var editor = new Simditor({
                textarea: $('#editor')
                //optional options
            });
        },
        data(){
            return{

            }
        },
        methods:{
            insert(){
                let content=document.getElementById('editor').value;
                let obj={content:content};
                this.$http.post('http://localhost:1234/dairy/insert/',obj).then(function (res) {
                     if(res.data.code==200){
                         console.log(res.data.data);
                      this.$router.go('index')
                     }else if(res.data.code==203){
                     alert('此用户未注册');
                     }
                }, function (err) {
                    console.log(err);
                });
            }
        }
    }
</script>