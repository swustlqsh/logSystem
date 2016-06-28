const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workbook');

const Site = require('./routes/site');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/',Site);

app.listen(1234,()=>{
	console.log('topxgun workbook is listening on port: 1234');
});
