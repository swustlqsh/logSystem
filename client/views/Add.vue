<template>
    <div class="add-log">
        <div class="add-title">
            <div class="add-date">
               2016/09/08
            </div>
            <div class="add-bts">
                <button>完成</button>
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