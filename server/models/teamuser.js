const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TeamUserSchema = new Schema({
	team_id:{type:ObjectId,ref:'Team'},
	user_id:{type:ObjectId,ref:'User'},
	create_date:{type:Date,default:Date.now}
});
	
module.exports = mongoose.model('TeamUser',TeamUserSchema);