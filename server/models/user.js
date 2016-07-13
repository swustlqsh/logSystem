const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new Schema({
	name:{type:String,default:''},
	email:{type:String,default:''},
	password:{type:String},
	team:{type:ObjectId,ref:'Team'},
	create_date:{type:Date,default:Date.now},
	last_login:{type:Date}
},{versionKey:false});
	
module.exports = mongoose.model('User',UserSchema);