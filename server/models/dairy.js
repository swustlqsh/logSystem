const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DairySchema = new Schema({
	user_id:{type:ObjectId,ref:'User'},
	title:{type:String,default:''},
	content:{type:String,default:''},
	create_date:{type:Date,default:Date.now},
	last_update:{type:Date,default:Date.now}
},{versionKey:false});
	
module.exports = mongoose.model('Dairy',DairySchema);