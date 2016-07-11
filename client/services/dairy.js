/**
 * Created by 刘娟娟 on 2016/7/8.
 */
import {API_URL} from '../config'
export default{
    //添加日志
    insert(app,dairyObj,cb){
        app.$http.post(API_URL+'/dairy/insert/',dairyObj).then((res)=> {
            if(res.data.code==200){
                cb(res.data.data);
            }else if(res.data.code==555){
                console.log(res.data.data);
            }
        },(err)=>{
            console.log(err);
        });
    },
    //添加的时候看一下今天是否已经添加
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