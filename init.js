/**
 * Created by 刘娟娟 on 2016/7/18.
 */
var mongoose=require('mongoose');
var Dairy=require('./server/models/dairy');
var Team = require('./server/models/team');
var User=require('./server/models/user');
var mongoIp=require('./config').mongoIp;
mongoose.connect('mongodb://'+mongoIp+'/workbook');

//日志初始化
function dairyInit(){
    Dairy.find({},function(err,data){
        if(err){
            console.log(err)
        }else{
            if(data&&data.length>0){
                data.forEach(function(item,n){
                    var obj={create_date:new Date(item.create_date)};
                    if(item.last_update){
                        obj.last_update=item.last_update
                    }else{
                        obj.last_update=new Date(item.create_date)
                    }
                    Dairy.update({_id:item._id},{$set:obj},function(err,d){
                        if(err){
                            console.log(err);
                        }else{
                            if(n==data.length-1){
                                console.log('日志ok');
                            }
                        }
                    })
                })
            }
        }
    })
}
//团队初始化
function teamInit(){
    Team.find({},function(err,data){
        if(err){
            console.log(err)
        }else{
            if(data&&data.length>0){
                data.forEach(function(item,n){
                    var obj={};
                    if(item.create_date){
                        obj.create_date=new Date(item.create_date);
                        Team.update({_id:item._id},{$set:obj},function(err,d){
                            if(err){
                                console.log(err);
                            }else{
                                if(n==data.length-1){
                                    console.log('团队ok');
                                }
                            }
                        })
                    }
                })
            }
        }
    })
}
//员工初始化
function userInit(){
    User.find({},function(err,data){
        if(err){
            console.log(err)
        }else{
            if(data&&data.length>0){
                data.forEach(function(item,n){
                    var obj={create_date:new Date(item.create_date)};
                    if(item.last_login){
                        obj.last_login=new Date(item.last_login);
                    }
                    User.update({_id:item._id},{$set:obj},function(err,d){
                        if(err){
                            console.log(err);
                        }else{
                            if(n==data.length-1){
                                console.log('员工ok');
                            }
                        }
                    })
                })
            }
        }
    })
}
dairyInit();
teamInit();
userInit();