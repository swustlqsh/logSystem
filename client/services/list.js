/**
 * Created by 刘娟娟 on 2016/7/11.
 */
import {API_URL} from '../../config'
export default {
    findByUser(app,userId,cb){
        app.$http.get(API_URL+'/dairy/findByUser/'+userId).then((res)=>{
            if(res.data.code==555){
                console.log(res.data.data);
            }else if(res.data.code==200){
                cb(res.data.data);
            }
        },(err)=>{
            console.log(err);
        });
    },
    getZeroTime(app,cb){
        app.$http.get(API_URL+'/site/zeroTime/').then((res)=>{
            if(res.data.code==200){
                cb(res.data.data);
            }
        },(err)=>{
            console.log(err);
        });
    },
    updateDairy(app,obj,cb){
        app.$http.post(API_URL+'/dairy/update/',obj).then((res)=>{
            if(res.data.code==555){
                console.log(res.data.data);
            }else if(res.data.code==200){
                cb(res.data.data);
            }
        },(err)=>{
            console.log(err);
        })
    },
    findByDate(app,obj,cb){
        app.$http.post(API_URL+'/dairy/findByDate/',obj).then((res)=>{
            if(res.data.code==555){
                console.log(res.data.data);
            }else if(res.data.code==200){
                cb(res.data.data);
            }
        },(err)=>{
            console.log(err);
        })
    }
}