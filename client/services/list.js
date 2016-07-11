/**
 * Created by 刘娟娟 on 2016/7/11.
 */
export default {
    findByUser(app,userId,cb){
        app.$http.get('http://localhost:1234/dairy/findByUser/'+userId).then((res)=>{
            cb(res);
        },(err)=>{
            console.log(err);
        });
    }
}