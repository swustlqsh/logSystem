var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name:{type:String,default:''},
	create_date:{type:Date,default:Date.now}
});
	
module.exports = mongoose.model('Team',TeamSchema);