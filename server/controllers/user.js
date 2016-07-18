/**
 * Created by 刘娟娟 on 2016/6/29.
 */
'use strict';
const User = require('../models/user');
const Team = require('../models/team');
const Token = require('../models/Token');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const _=require('lodash');

//以下是manager
exports.findByTeam=(req,res)=>{
    let query={};
    if(req.body.teamId!='111111111111111111111111'){
        query.team=req.body.teamId;
    }
    let per_page=req.body.per_page;
    let current_page=req.body.current_page;
    User.find(query)
        .sort({team: 1,name:1,create_date:-1})
        .populate('team')
        .skip(per_page*(current_page-1))
        .limit(per_page)
        .exec((err, users)=> {
            if (err) {
                res.json({code: 555, data: err})
            } else {
                User.count(query, (err, sum)=> {
                    res.json({code: 200, data: users, sum: sum})
                })
            }
        });
};
/*exports.findByTeam=(req,res)=>{
    let query={};
    if(req.params.teamId!='111111111111111111111111'){
        query.team=req.params.teamId;
    }
    User.find(query)
        .sort({create_date: -1})
        .populate('team')
        .exec((err, users)=> {
            if (err) {
                res.json({code: 555, data: err})
            } else {
                res.json({code: 200, data: users});
            }
        });
};*/
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
exports.findUserIdByTeam=(req,res)=>{
    User.find({team:req.params.teamId},{_id:1},(err,data)=>{
        if(err){
            res.json({code:555,data:err});
        }else{
            let arr=[];
            data.forEach((item)=>{
                arr.push(item._id);
            });
            res.json({code:200,data:arr});
        }
    })
};
//登录
exports.managerLogin=function(req,res){
    if(req.body.email&&req.body.password){
        User.findOne({email:req.body.email},function(err,user){
            if(err){
                res.json({code:555,data:err});
            }else if(user){
                bcrypt.compare(req.body.password,user.password,function(err,data){
                    if(err){
                        res.json({code:501,data:err});
                    }else{
                        if(data){
                            var obj={_id:user._id};
                            var token=jwt.encode({
                                iss:obj
                            },'topxgun');
                            var t=new Token();
                            t.user_id=user._id;
                            t.token=token;
                            t.create_date=new Date();
                            t.save(function(err,data){
                                if(err){
                                    res.json({code:555,data:err});
                                }else{
                                    console.log('2131');
                                    res.json({code:200,data:token})
                                }
                            })
                        }else{
                            res.json({code:501,data:'账户密码不匹配'})
                        }
                    }
                })
            }else{
                res.json({code:404});
            }
        })
    }
};
//注册，不公开
exports.insert2=function(req,res){
    var userObj=new User(req.body);
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            res.json({code:555,data:err});
        }else{
            bcrypt.hash('topxgun123',salt,null,function(err,hash){
                if(err){
                    res.json({code:555,data:err});
                }else{
                    userObj.password=hash;
                    userObj.save(function(err,data){
                        if(err){
                            res.json({code:555,data:err});
                        }else{
                            res.json({code:200,data:data});
                        }
                    })
                }
            })
        }
    })
};

//以下是client
exports.clientLogin=(req,res)=>{
    User.find({email:req.params.email},function(err,data){
        if(err){
            res.json({code:555,data:err})
        }else{
            if(data.length>0){
                User.update({_id:data[0]._id},{$set:{last_login:new Date()}},(err,user)=>{
                    if(err){
                        res.json({code:555,data:err})
                    }else{
                        res.json({code:200,data:data[0]})
                    }
                })
            }else{
                res.json({code:203,data:'不存在此用户'})
            }
        }
    })
};

