/**
 * Created by 刘娟娟 on 2016/7/6.
 */
'use strict';
const Dairy = require('../models/dairy');
//client
exports.insert=(req,res)=>{
    console.log(req.sessionID);
    console.log(req);
    console.log(req.body);

};
