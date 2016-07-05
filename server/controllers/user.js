/**
 * Created by 刘娟娟 on 2016/6/29.
 */
'use strict';
const User = require('../models/user');
const Team = require('../models/team');
const _=require('lodash');

//以下是manager
exports.findByTeam=(req,res)=>{
    let query={};
    if(req.body.teamId!='111111111111111111111111'){
        query.team=req.body.teamId;
    }
    User.find(query)
        .sort({create_date: -1})
        .populate('team')
        .limit(req.body.pagnite)
        .skip(req.body.pagnite * (req.body.page - 1))
        .exec((err, users)=> {
            if (err) {
                res.json({code: 555, data: err})
            } else {
                User.count(query, (err, sum)=> {
                    res.json({code: 200, data: users, total: sum})
                })
            }
        });
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
//以下是client
exports.clientLogin=(req,res)=>{
    User.find({email:req.params.email},function(err,data){
        if(err){
            res.json(err);
        }else{
            if(data.length>0){
                req.session.userId=data[0]._id;
                console.log(req.session.userId);
                res.json({code:200,data:data[0]})
            }else{
                res.json({code:203,data:'不存在此用户'})
            }
        }
    })
};
exports.test=(req,res)=>{
   console.log(req);
   console.log(req.session);
};