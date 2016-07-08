/**
 * Created by 刘娟娟 on 2016/7/8.
 */
export default {
    login(app,email){
        app.$http.get('http://localhost:1234/user/clientLogin/'+email).then((res)=>{
            if(res.data.code==200){
                app.$router.go({name:'user',params:{userId:res.data.data._id}});
            }else if(res.data.code==203){
                alert('此用户未注册');
            }
        }, (err)=> {
            console.log(err);
        });
    }
}