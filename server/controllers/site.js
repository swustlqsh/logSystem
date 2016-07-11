/**
 * Created by 刘娟娟 on 2016/7/11.
 */
'use strict';
exports.zeroTime=(req,res)=>{
    let time=new Date();
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    res.json({code:200,data:time})
};