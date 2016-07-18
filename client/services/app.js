/**
 * Created by 刘娟娟 on 2016/7/18.
 */
const API_URL=require('../../config').API_URL;
export default{
    me(app,userId,cb){
        app.$http.get(API_URL+'/user/clientFindById/'+userId).then(res=>{
            if(res.data.code==200){
                cb(res.data.data);
            }else if(res.data.code==555){
                console.log(res.data.data);
            }
        },(err)=>{
            console.log(err);
        })
    }
}