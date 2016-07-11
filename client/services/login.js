/**
 * Created by 刘娟娟 on 2016/7/8.
 */
export default {
    login(app,email,cb){
        app.$http.get('http://localhost:1234/user/clientLogin/'+email).then((res)=>{
            cb(res);
        }, (err)=> {
            console.log(err);
        });
    }
}