/**
 * Created by 刘娟娟 on 2016/7/8.
 */
import {API_URL} from '../../config'
export default {
    login(app,email,cb){
        app.$http.get(API_URL+'/user/clientLogin/'+email).then((res)=>{
            if(res.data.code==555){
                console.log(res.data.data);
            }else if(res.data.code==203){
                alert('此用户未注册');
            }else if(res.data.code==200){
                cb(res.data.data);
            }
        }, (err)=> {
            console.log(err);
        });
    }
}