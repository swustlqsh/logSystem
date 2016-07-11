/**
 * Created by 刘娟娟 on 2016/7/8.
 */
import {API_URL} from '../config'
export default {
    login(app,email,cb){
        app.$http.get(API_URL+'/user/clientLogin/'+email).then((res)=>{
            cb(res);
        }, (err)=> {
            console.log(err);
        });
    }
}