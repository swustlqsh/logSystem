/**
 * Created by 刘娟娟 on 2016/7/8.
 */
const API_URL=require('../config').API_URL;
export default {
    login(app,email,cb){
        app.$http.get(API_URL+'/user/clientLogin/'+email).then((res)=>{
            if(res.data.code==555){
                console.log(res.data.data);
            }else if(res.data.code==203){
                swal("",'用户邮箱不存在！','error');
            }else if(res.data.code==200){
                cb(res.data.data);
            }
        }, (err)=> {
            console.log(err);
        });
    }
}