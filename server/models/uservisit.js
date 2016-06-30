const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserVisitSchema = new Schema({
	user_id:{type:ObjectId,ref:'User'},
	team:{type:ObjectId,ref:'Team'},//被访问者所属团队
	visit_id:{type:ObjectId,ref:'User'}
});
	
module.exports = mongoose.model('UserVisit',UserVisitSchema);