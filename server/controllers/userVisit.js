/**
 * Created by 刘娟娟 on 2016/7/1.
 */
'use strict';
const UserVisit=require('../models/userVisit');
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
                    res.json({code:200,data:data})
                }
            })
        }
    })
};
