/**
 * Created by 刘娟娟 on 2016/6/29.
 */
'use strict';
const User = require('../models/user');
const Team = require('../models/team');
const _=require('lodash');
exports.findByTeam=(req,res)=>{
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
exports.findById=(req,res)=>{
    User.findById(req.params._id,(err,user)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:user})
        }
    })
};
exports.insert=(req,res)=>{
    User.count({email:req.body.email},(err,count)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            if(count>0){
                res.json({code:201,data:count})
            }else{
                let userObj=new User(req.body);
                userObj.save((err,users)=>{
                    if(err){
                        res.json({code:555,data:err})
                    }else{
                        res.json({code:200,data:users})
                    }
                })
            }
        }
    })

};
exports.update=(req,res)=>{
    let _id=req.body._id;
    delete req.body._id;
    User.count({_id:{$ne:_id},email:req.body.email},(err,count)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            if(count>0){
                res.json({code:201,data:count})
            }else{
                User.update({_id:_id},{$set:req.body},(err,data)=>{
                    if(err){
                        res.json({code:555,data:err})
                    }else{
                        res.json({code:200,data:data})
                    }
                })
            }
        }
    })

};
exports.remove=(req,res)=>{
    User.remove({_id:req.params._id},(err,data)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:data})
        }
    })
};
exports.teamUser=(req,res)=>{
    Team.find({},(err,teams)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            User.find({},(err,users)=>{
                if(err){
                    res.json({code:555,data:err})
                }else{
                    let arr=[];
                    let userArr=[];
                    _.each(teams,(team)=>{
                        let obj={name:team.name,_id:team._id,items:[]};
                        arr.push(obj);
                    });
                    _.each(users,(user)=>{
                        let obj={name:user.name,_id:user._id,team:user.team};
                        userArr.push(obj);
                    });
                    _.each(arr,(a)=>{
                        a.items=_.filter(userArr,{team:a._id})
                    });
                    res.json({code:200,data:arr});
                }
            })
        }
    })
};