/**
 * Created by 刘娟娟 on 2016/7/11.
 */
import {API_URL} from '../config'
export  default{
    insertDairy(app,userId,cb){
            app.$http.get(API_URL+'/dairy/isInsert/'+userId).then((res)=>{
                cb(res);
            },(err)=>{
                console.log(err);
            })
    }
}