/**
 * Created by 刘娟娟 on 2016/7/8.
 */
import {API_URL} from '../config'
export default{
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
    }
}