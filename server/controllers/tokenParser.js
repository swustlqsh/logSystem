const Token = require('../models/Token');
exports.parseToken=function(req,res,next){
    if(req.headers.authorization){
        Token.count({token:req.headers.authorization},function(err,data){
            if(err){
                res.json(err);
                res.end();
            }else{
                if(data<1){
                    res.json({code:555,info:'token错误'});
                }else{
                    next();
                }
            }
        })
    }
};
