/**
 * Created by 刘娟娟 on 2016/7/11.
 */
import {API_URL} from '../config'
export  default{
    insertDairy(app,userId,cb){
            app.$http.get(API_URL+'/dairy/isInsert/'+userId).then((res)=>{
                if(res.data.code==201){
                    cb();
                }else if(res.data.code==200){

                }else if(res.data.code==555){
                    console.log(res.data.data);
                }
            },(err)=>{
                console.log(err);
            })
    }
}