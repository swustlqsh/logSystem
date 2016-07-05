const express = require('express');

const router = express.Router();

const login = require('../controllers/site');
const team = require('../controllers/team');
const user = require('../controllers/user');
const userVisit = require('../controllers/userVisit');
router
	  .post('/user/findByTeam/',user.findByTeam)
	  .get('/user/123',user.test)
	  .get('/user/clientLogin/:email',user.clientLogin)
	  .get('/user/findById/:_id',user.findById)
	  .get('/user/teamUser',user.teamUser)
	  .post('/user/insert',user.insert)
	  .post('/user/update',user.update)
	  .delete('/user/:_id',user.remove)

	  .post('/userVisit/insert',userVisit.insert)
	  .get('/userVisit/findVisits/:_id',userVisit.findVisits)


	  .post('/team/update',team.update)
	  .post('/team/insert',team.insert)
	  .delete('/team/:_id',team.remove)
	  .get('/team/find',team.find);
/*router.route('/')
	.get(siteController.getLogin)
router.route('/login')
	.get(siteController.getLogin)
	.post(siteController.postLogin)

router.route('/workbook')
	.get(siteController.workbook)

router.route('/publishDairy')
	.post(siteController.publishDairy)

router.route('/ajaxDairy')
	.get(siteController.ajaxDairy)

router.route('/user2user')
	.get(siteController.user2user)

router.route('/usercannotvisit')
	.get(siteController.usercannotvisit)
router.route('/usercanvisit')
	.get(siteController.usercanvisit)
router.route('/uservisit')
	.get(siteController.uservisit)

router.route('/users')
	.get(siteController.users)*/

module.exports = router; 
