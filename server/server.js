const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workbook');

const Site = require('./routes/site');

app.all('*',function(req,res,next){
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type,Authen,Authorization');
	res.header("X-Powered-By",'NB TopXGun');
	if ('OPTIONS' == req.method) return res.send(200);
	next();
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/',Site);

app.listen(1234,()=>{
	console.log('topxgun workbook is listening on port: 1234');
});
