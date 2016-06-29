/**
 * Created by 刘娟娟 on 2016/6/29.
 */
const User = require('../models/user');
exports.find=(req,res)=>{
    User.find({},(err,users)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:users})
        }
    })
};