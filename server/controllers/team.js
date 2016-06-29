/**
 * Created by 刘娟娟 on 2016/6/29.
 */
const Team = require('../models/team');
exports.find=(req,res)=>{
    Team.find({})
        .sort({create_date:-1})
        .exec((err,users)=>{
            if(err){
                res.json({code:555,data:err})
            }else{
                res.json({code:200,data:users})
            }
        })
};
exports.update=(req,res)=>{
    Team.update({_id:req.body._id},{$set:{name:req.body.name}},(err,data)=>{
        if(err){
            res.json({code:555,data:err})
        }else{
            res.json({code:200,data:data})
        }
    })
};