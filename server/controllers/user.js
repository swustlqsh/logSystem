/**
 * Created by 刘娟娟 on 2016/6/29.
 */
'use strict';
const User = require('../models/user');
exports.findByTeam=(req,res)=>{
    console.log(req.params);
    let query={};
    if(req.params._id!='111111111111111111111111'){
        query.team=req.params._id
    }
    User.find(query)
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