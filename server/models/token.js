/**
 * Created by 刘娟娟 on 2016/5/14.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var tokenSchema=new Schema({
    create_date:{type:Date,default:Date.now},//生成时间
    user_id:{type:ObjectId,ref:'User'},//user id
    token:{type:Object,default:''}//token
},{versionKey:false});
tokenSchema.index({ create_date: 1 }, { expireAfterSeconds : 60*60*12});
module.exports=mongoose.model('token',tokenSchema);