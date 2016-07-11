/**
 * Created by 刘娟娟 on 2016/7/8.
 */
import {API_URL} from '../config'
export default{
    insert(app,dairyObj,cb){
        app.$http.post(API_URL+'/dairy/insert/',dairyObj).then((res)=> {
            cb(res);
        },(err)=>{
            console.log(err);
        });
    }
}