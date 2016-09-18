/**
 * Created by 刘娟娟 on 2016/9/6.
 */
export default{
    count:function(dbObj,query={}){
        return new Promise((resolve,reject)=>{
            dbObj.count(query,(err,count)=>{
                if(err){
                    return reject(err);
                }else{
                    return resolve(count)
                }
            })
        })
    }
};
