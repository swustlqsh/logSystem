/**
 * Created by 刘娟娟 on 2016/7/6.
 */
'use strict';
const Dairy = require('../models/dairy');
//client
exports.insert=(req,res)=>{
    let dairyObj=new Dairy(req.body);
    dairyObj.save((err,data)=>{
        if(err){
            res.json({code:500,data:err});
        }else{
            res.json({code:200,data:data});
        }
    })

};
exports.findByUser=(req,res)=>{
    Dairy.find({user_id:req.params.userId})
    .sort({create_date:-1})
    .exec((err,data)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:data})
        }
    })
};