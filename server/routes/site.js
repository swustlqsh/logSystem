const express = require('express');
const router = express.Router();

const login = require('../controllers/site');
const team = require('../controllers/team');
const user = require('../controllers/user');
router.get('/user/find',user.find);
router.get('/team/find',team.find);
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
