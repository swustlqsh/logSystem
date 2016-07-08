/**
 * Created by 刘娟娟 on 2016/7/6.
 */
'use strict';
const Dairy = require('../models/dairy');
//client
exports.insert=(req,res)=>{
    console.log(req.body);
    let dairyObj=new Dairy(req.body);
    dairyObj.save((err,data)=>{
        if(err){
            res.json({code:500,data:err});
        }else{
            res.json({code:200,data:data});
        }
    })

};
