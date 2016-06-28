const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
	name:{type:String,default:''},
	create_date:{type:Date,default:Date.now}
});
	
module.exports = mongoose.model('Team',TeamSchema);