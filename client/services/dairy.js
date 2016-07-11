/**
 * Created by 刘娟娟 on 2016/7/8.
 */
export default{
    insert(app,dairyObj,cb){
        app.$http.post('http://localhost:1234/dairy/insert/',dairyObj).then((res)=> {
            cb(res);
           /* if(res.data.code==200){
                app.$router.go({name:'user',params:{userId:app.$route.params.userId}});
            }else if(res.data.code==203){
                alert('此用户未注册');
            }*/
        },(err)=>{
            console.log(err);
        });
    }
}