const express = require('express');

const router = express.Router();

const dairy = require('../controllers/dairy');
const team = require('../controllers/team');
const user = require('../controllers/user');
const userVisit = require('../controllers/userVisit');
router
	  .post('/user/findByTeam/',user.findByTeam)
	  .get('/user/clientLogin/:email',user.clientLogin)
	  .get('/user/findById/:_id',user.findById)
	  .get('/user/teamUser',user.teamUser)
	  .post('/user/insert',user.insert)
	  .post('/user/update',user.update)
	  .delete('/user/:_id',user.remove)

	  .post('/dairy/insert',dairy.insert)

	  .post('/userVisit/insert',userVisit.insert)
	  .get('/userVisit/findVisits/:_id',userVisit.findVisits)


	  .post('/team/update',team.update)
	  .post('/team/insert',team.insert)
	  .delete('/team/:_id',team.remove)
	  .get('/team/find',team.find);
module.exports = router; 
