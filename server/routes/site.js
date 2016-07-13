const express = require('express');

const router = express.Router();

const site = require('../controllers/site');
const dairy = require('../controllers/dairy');
const team = require('../controllers/team');
const user = require('../controllers/user');
const userVisit = require('../controllers/userVisit');
const tokenParser = require('../controllers/tokenParser');
router
//manager
    .post('/user/findByTeam/', tokenParser.parseToken, user.findByTeam)
    //.get('/user/findByTeam/:teamId', tokenParser.parseToken, user.findByTeam)
    .get('/user/findById/:_id', tokenParser.parseToken, user.findById)
    .get('/user/teamUser', tokenParser.parseToken, user.teamUser)
    .post('/user/insert', tokenParser.parseToken, user.insert)
    .post('/user/update', tokenParser.parseToken, user.update)
    .post('/user/insert2', user.insert2)
    .post('/user/managerLogin', user.managerLogin)
    .delete('/user/:_id', tokenParser.parseToken, user.remove)

    .post('/userVisit/insert', tokenParser.parseToken, userVisit.insert)
    .get('/userVisit/findVisits/:_id', tokenParser.parseToken, userVisit.findVisits)


    .post('/team/update', tokenParser.parseToken, team.update)
    .post('/team/insert', tokenParser.parseToken, team.insert)
    .delete('/team/:_id', tokenParser.parseToken, team.remove)
    .get('/team/find', tokenParser.parseToken, team.find)

    .post('/dairy/findByUser/',tokenParser.parseToken, dairy.findDairyByUser)
    //client
    .get('/user/clientLogin/:email', user.clientLogin)
    .get('/site/zeroTime', site.zeroTime)

    //查看今日日志是否存在，若存在则不可以再次添加，只可修改。
    .get('/dairy/isInsert/:userId', dairy.isInsert)
    .get('/dairy/findByUser/:userId', dairy.findByUser)
    .get('/dairy/getNowTime/',dairy.getNowTime)
    .post('/dairy/insert', dairy.insert)
    .post('/dairy/update', dairy.update)
    .post('/dairy/findByDate', dairy.findByDate);
module.exports = router;
