var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email:{type:String,default:''},
	last_login:{type:Date,default:Date.now}
});
	
module.exports = mongoose.model('User',UserSchema);