const Token = require('../models/Token');
exports.parseToken=function(req,res,next){
    if(req.headers.authorization){
        Token.count({token:req.headers.authorization},function(err,data){
            if(err){
                res.json({code:555,data:'token错误'});
                res.end();
            }else{
                if(data<1){
                    res.json({code:888,data:'token错误'});
                }else{
                    next();
                }
            }
        })
    }
};
