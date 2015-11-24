var express = require('express');
var tokenCheck = require('../TokenCheck.js');

module.exports = function(User){

	var userRouter = express.Router();
	//userRouter.use(tokenCheck);

	userRouter.route('/')
		.get(function(req,res){

			User.find({} , function(err , users){
				res.json(users).status(200);
			});
			
		})
		.post(function(req,res){

			var data = req.body;
			if(data._id){
				delete data._id;
			}
			var user = new User(data);
			user.save(function(err){
				if(err){
					res.json({ success : false , error :  err }).status(500);
				}else{
					res.json({ success : true , id : user._id }).status(201);
				}
			});

		});


		
	return userRouter;
};



