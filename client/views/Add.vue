<template>
    <div class="add-log">
        <div class="add-title">
            <div class="add-date" style="float: left">
                123
            </div>
            <div class="add-bts" >
                456
            </div>
        </div>
        <div class="editor">
            <textarea id="editor" placeholder="请输入日志内容。。。" autofocus></textarea>
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
        }
    }
</script>