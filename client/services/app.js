/**
 * Created by 刘娟娟 on 2016/7/11.
 */
import {API_URL} from '../config'
export  default{
    insertDairy(app,userId,cb){
            app.$http.get(API_URL+'/dairy/isInsert/'+userId).then((res)=>{
                if(res.data.code==201){
                    alert('今日日志已经存在，请直接在此页修改！')
                }else if(res.data.code==200){
                    cb(res.data.data);
                }else if(res.data.code==555){
                    console.log(res.data.data);
                }
            },(err)=>{
                console.log(err);
            })
    }
}