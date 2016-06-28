var User = require('../models/user');
/*var Dairy = require('../models/dairy');
var Team = require('../models/team');
var TeamUser = require('../models/teamuser');
var resHelper = require('../services/resHelper');
var eventproxy = require('eventproxy');
var UserVisit = require('../models/uservisit');
var UserList = require('../config/userlist');*/
exports.find=(req,res)=>{
	User.find({},(err,users)=>{
		if(err){
			res.json({code:555,data:err})
		}else{
			res.json({code:200,data:users})
		}
	})
};
/*exports.workbook = function(req,res){
	var user_id = req.query.user_id;
	var see_id = req.query.see_id;
	var ep = new eventproxy();

		

	ep.all('users','user',function(users,user){
		console.log(users,user)
		res.render('index.html',{
			users:users,
			user:user,
			see_id:see_id,
			UserList:UserList
		});
	})


	User.findById(user_id,function(err,user){
		if(err) {
			// 返回 系统繁忙 ，请稍后
		} else {
			console.log(user);
			ep.emit('user',user);
		}
	})

	UserVisit.find({user_id:user_id})
	.populate('visit_id')
	.exec(function(err,users){
		console.log(users)
		if(err) {
			// 返回 系统繁忙 ，请稍后
		} else {
			ep.emit('users',users);
		}
	})
}

//post login
exports.getLogin = function(req,res){
	res.render('login.html')
}

exports.postLogin = function(req,res){
	var email = req.body.email;
	User.findOne({email:email},function(err,user){
		if(err)	{
			// 返回 系统繁忙，请稍后
		} else {
			if(user){
				// 登录，并记录login时间
				var now_date = new Date().getTime();
				user.last_login = now_date;
				user.save(function(err,$user){
					if(err){
						// 返回 系统繁忙，请稍后
					} else {
						res.redirect('/workbook?user_id='+$user._id+'&see_id='+$user._id)
					}
				})
			}else {
				// 用户不存在，则新建，创建完毕之后登录，并记录login时间
				var _user = new User();
				_user.email = email;
				var now_date = new Date().getTime();
				_user.last_login = now_date;
				_user.save(function(err,user){
					if(err){
						// 返回 系统繁忙，请稍后
					} else {
						res.redirect('/workbook?user_id='+user._id+'&see_id='+user._id)
					}
				})
			}
		}
	});
}

// 日志模块
exports.publishDairy = function(req,res){


	var user_id = req.query.user_id;
	var see_id = req.query.see_id;
	var dairy_id = req.query.dairy_id?req.query.dairy_id:'';
	if(user_id===see_id){
		if(dairy_id){
			console.log(1)
			var now_date = new Date().getTime();
			var content = req.body.content;
			var title = req.body.title;

			Dairy.findById(dairy_id,function(err,dairy){
				if(err){
					// 返回 系统繁忙，请稍候
				} else {
					dairy.title = title;
					dairy.last_update = now_date;
					dairy.content = content;

					dairy.save(function(err,$dairy){
						if(err){
							// 返回系统繁忙，请稍候
						} else {
							res.json(resHelper.jsonBack(0,$dairy,'保存成功'));
						}
					})
				}
			})

		}else {
			console.log(2)
			var now_date = new Date().getTime();
			var content = req.body.content;
			var title = req.body.title;

			Dairy.find({user_id:see_id,title:title},function(err,$dairy){
				if(err){}
					else{
						console.log($dairy)
						if($dairy.length){

							$dairy[0].title = title;
							$dairy[0].last_update = now_date;
							$dairy[0].content = content;

							$dairy[0].save(function(err,$$dairy){
								if(err){
									// 返回系统繁忙，请稍候
								} else {
									res.json(resHelper.jsonBack(0,$$dairy,'保存成功'));
								}
							})

						}else{
							var _dairy = new Dairy();
							_dairy.title = title;
							_dairy.user_id = user_id;
							_dairy.content = content;
							_dairy.create_date = now_date;
							_dairy.last_update = now_date;

							_dairy.save(function(err,dairy){
								if(err){
									// 返回系统繁忙，请稍候
								} else {
									// 日记保存成功，返回用户界面
											res.json(resHelper.jsonBack(0,dairy,'保存成功'));
								}
							});
						}
					}
			})

			
		}
	} else {
		// 返回无权限
	}
	
}

exports.updateDairy = function(req,res){

	var dairy_id = req.query.dairy_id;
	var user_id = req.query.user_id;
	var now_date = new Date().getTime();
	var content = req.body.content;
	var title = req.body.title;


	Dairy.findOne({user_id:user_id,_id:dairy_id},function(err,_dairy){
		if(err){
			// 返回系统繁忙，请稍后
		} else {
			if(_dairy){
				_dairy.title = title;
				_dairy.content = content;
				_dairy.last_update = now_date;

				_dairy.save(function(err,dairy){
					if(err){
						// 返回系统繁忙，请稍候
					} else {
						// 日记保存成功，返回用户界面
					}
				});
			}else{
				// 返回日志未找到，请重试
			}
		}
	});
}

exports.ajaxDairy = function(req,res){
	var query = {};
	var dairy_id = req.query.dairy_id?req.query.dairy_id:'';
	var title = req.query.title?req.query.title:'';
	var from  = req.query.from;
	var to = req.query.to;
	var user_id = req.query.user_id?req.query.user_id:'';
	var page = req.query.page?parseInt(req.query.page):1;
	var limit = req.query.limit?parseInt(req.query.limit):30;
	var sortname = req.query.sortname?req.query.sortname:'create_date';
	var sortmethod = req.query.sortmethod?req.query.sortmethod:'desc';
	var sort = {}

	if(sortmethod === 'desc'){
		 sort[sortname] = -1;
	}else{
		 sort[sortname] = 1;
	}
	if(dairy_id){
		query._id = dairy_id
	}
	if(user_id){
		query.user_id = user_id;
	}
	if(title){
		query.title = title;
	}

	Dairy.find(query)
		 .skip((page-1)*limit)
		 .limit(limit)
		 .sort({create_date:-1})
		 .exec(function(err,dairies){
		 	if(err){
		 		// 系统繁忙，请稍后
		 	} else {
		 		if(dairies.length){
		 			// 返回数据
		 			res.json(resHelper.jsonBack(0,dairies,'查询成功,返回数据'))
		 		} else {
		 			// 返回空数据
		 			res.json(resHelper.jsonBack(0,[],'查询成功,返回数据'))

		 		}
		 	}
		 })
}


// team 模块

exports.createTeam = function(req,res){
	var name = req.body.name;
	var now_date = new Date().getTime();

	var _team = new Team();
	_team.name = name;
	_team.create_date = now_date;

	_team.save(function(err,team){
		if(err){
			// 系统繁忙，请稍后
		} else {
			// team 创建成功
		}
	})
}

exports.user2team = function(req,res){
	var team_id = req.body.team_id;
	var user_id = req.query.user_id;
	var now_date = new Date().getTime();

	var _teamuser = new TeamUser();
	_teamuser.team_id = team_id;
	_teamuser.user_id = user_id;

	_teamuser.save(function(err,teamuser){
		if(err){
			// 系统繁忙，请稍后
		} else {
			// teamuser 创建成功
		}
	})
}


exports.user2user = function(req,res){
	User.find(function(err,users){
		res.render('userlist',{
			users:users,
			UserList:UserList
		});
	})
}

exports.usercannotvisit = function(req,res){
	var user_id = req.query.user_id;
	var visit_id = req.query.visit_id;
	UserVisit.remove({user_id:user_id,visit_id:visit_id},function(){
		res.json(resHelper.jsonBack(0,{},'访问权限取消'))
	})
}

exports.usercanvisit = function(req,res){
	var user_id = req.query.user_id;
	var visit_id = req.query.visit_id;
	var _uservisit = new UserVisit();
	_uservisit.user_id = user_id;
	_uservisit.visit_id = visit_id;

	_uservisit.save(function(err,uservisit){
		res.json(resHelper.jsonBack(0,uservisit,'访问权限设置成功'))
	})
}


exports.uservisit = function(req,res){
	var user_id = req.query.user_id;
	UserVisit.find({user_id:user_id},function(err,visits){
		res.json(resHelper.jsonBack(0,visits,'返回数据'))
	})
}

exports.users = function(req,res){
	var userlistflag = req.query.userlistflag;
	if(userlistflag == 'no'){
		User.find(function(err,users){
			if(err) {
				// 返回 系统繁忙 ，请稍后
			} else {
				res.json({
					code:0,
					data:{
						users:users,
						UserList:UserList
					},
					info:'返回数据'
				})
			}
		})
	}else{
		User.find(function(err,users){
			if(err) {
				// 返回 系统繁忙 ，请稍后
			} else {
				res.json({
					code:0,
					data:{
						users:users
					},
					info:'返回数据'
				})
			}
		})
	}
	
}*/
