/**
 * Created by 刘娟娟 on 2016/7/1.
 */
'use strict';
const UserVisit=require('../models/userVisit');
const Team=require('../models/team');
const _=require('lodash');
exports.insert=(req,res)=>{
    UserVisit.remove({user_id:req.body.user_id},(err,r)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            let arr=[];
            _.each(req.body.visit_ids,(visit)=>{
                arr.push({user_id:req.body.user_id,visit_id:visit})
            });
            UserVisit.create(arr,(err,data)=>{
                if(err){
                    res.json({code:555,data:err})
                }else{
                    console.log(data);
                    res.json({code:200,data:data})
                }
            })
        }
    })
};
exports.findVisits=(req,res)=>{
    UserVisit.find({user_id:req.params._id},(err,data)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            let arr=[];
            _.each(data,(item)=>{
                arr.push(item.visit_id);
            });
            res.json({code:200,data:arr})
        }
    })
};

//client
//查找有权限访问员工的所有部门
exports.findTeamAuth=(req,res)=>{
    UserVisit
        .find({user_id:req.params.userId})
        .populate({path:'visit_id',select:'team'})
        .exec((err,data)=>{
            if(err){
                res.json({code:555,data:err})
            }else{
                let arrTeam=[];
                if(data&&data.length>0){
                    data.forEach((x)=>{
                        arrTeam.push(x.visit_id.team)
                    });
                    Team.find({_id:{$in:arrTeam}},(err,teams)=>{
                        if(err){
                            res.json({code:555,data:err})
                        }else{
                            res.json({code:200,data:teams})
                        }
                    })
                }
            }
        })
};
//点击某个部门将这个部门的可访问的人员查出来
exports.findUserByTeam=(req,res)=>{
    UserVisit.find({user_id:req.body.user_id})
    .populate({path:'visit_id',match:{team:req.body.team_id}})
    .exec((err,data)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            if(data&&data.length>0){
                let arr=[];
                data.forEach((x)=>{
                    if(x.visit_id&&x.visit_id._id){
                        let obj={_id:x.visit_id._id,name:x.visit_id.name};
                        return arr.push(obj);
                    }
                });
                res.json({code:200,data:arr})
            }else{
                res.json({code:333,data:'无数据'})
            }
        }
    })
};
