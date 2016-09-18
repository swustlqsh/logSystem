import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import mongoose from 'mongoose'
import Site from './routes/site'
const app = express();
const mongoIp=require('./config').mongoIp;
mongoose.connect('mongodb://'+mongoIp+'/workbook');


 //app.use(favicon(__dirname+'/img/txg.ico'));


app.all('*',(req,res,next)=>{
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type,Authen,Authorization');
	res.header("X-Powered-By");
	if ('OPTIONS' == req.method) return res.sendStatus(200);
	next();
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/',Site);

app.listen(1234,()=>{
	console.log('workbook is listening on port: 1234');
});
