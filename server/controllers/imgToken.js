/**
 * Created by 刘娟娟 on 2016/7/14.
 */
'use strict';
const QINIU=require('../config').QINIU;
const qiniu=require('qiniu');
exports.token=(req,res)=>{
    qiniu.conf.ACCESS_KEY = QINIU.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = QINIU.SECRET_KEY;
    let upToken = new qiniu.rs.PutPolicy(QINIU.Bucket_Name);
    res.json({token:upToken.token()})
};
