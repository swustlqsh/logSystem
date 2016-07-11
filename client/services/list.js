/**
 * Created by 刘娟娟 on 2016/7/11.
 */
import {API_URL} from '../config'
export default {
    findByUser(app,userId,cb){
        app.$http.get(API_URL+'/dairy/findByUser/'+userId).then((res)=>{
            cb(res);
        },(err)=>{
            console.log(err);
        });
    }
}