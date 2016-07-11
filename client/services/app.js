/**
 * Created by 刘娟娟 on 2016/7/11.
 */
export  default{
    insertDairy(app,userId){
        if($('.js-add').hasClass('log-options-active')){
            $('.js-add').removeClass('log-options-active');
            app.$router.go({name:'user',params:{userId:app.$route.params.userId}});
        }else{
            app.$http.get('http://localhost:1234/dairy/isInsert/'+userId).then((res)=>{
                if(res.data.code==201){
                    alert('今日日志已经存在，请直接在此页修改！')
                }else if(res.data.code==200){
                    $('.js-add').addClass('log-options-active');
                    app.$router.go(app.$route.path+'/dairy');
                }
            },(err)=>{
                console.log(err);
            })
        }
    }
}