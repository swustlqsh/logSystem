var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserVisitSchema = new Schema({
	user_id:{type:ObjectId,ref:'User'},
	visit_id:{type:ObjectId,ref:'User'}
});
	
module.exports = mongoose.model('UserVisit',UserVisitSchema);