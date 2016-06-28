<template>
    <div class="center">
        <form class="form-horizontal  col-md-offset-4 col-md-4">
            <div class="form-group col-md-10">
                <input type="email" class="form-control" id="email" placeholder="email">
            </div>
            <a type="submit" class="btn btn-default" @click="login">登录</a>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                msg: '日志管理'
            }
        },
        methods: {
            login: ()=> {
                console.log('login')
            }
        }
    }
</script>
