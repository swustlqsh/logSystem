/**
 * Created by 刘娟娟 on 2016/7/13.
 */
const API_URL=require('../../config').API_URL;
export default{
    login(app,obj,cb){
        app.$http.post(API_URL+'/user/managerLogin',obj).then((res)=>{
            if(res.data.code==501||res.data.code==404){
                alert('登录不成功，请检查用户名与密码是否匹配')
            }else if(res.data.code==555||res.data.code==888){
                console.log(res.data.data);
            }else if(res.data.code==200){
                cb(res.data.data);
            }
        },(err)=>{
            console.log(err);
        })
    }
}