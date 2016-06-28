var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TeamUserSchema = new Schema({
	team_id:{type:ObjectId,ref:'Team'},
	user_id:{type:ObjectId,ref:'User'},
	create_date:{type:Date,default:Date.now}
});
	
module.exports = mongoose.model('TeamUser',TeamUserSchema);