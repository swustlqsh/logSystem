/**
 * Created by 刘娟娟 on 2016/6/29.
 */
'use strict';
const User = require('../models/user');
exports.find=(req,res)=>{
    User.find({})
    .sort({create_date:-1})
    .populate('team')
    .exec((err,users)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:users})
        }
    })
};
exports.insert=(req,res)=>{
    let userObj=new User(req.body);
    userObj.save((err,users)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:users})
        }
    })
};