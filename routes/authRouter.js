var express = require('express');
var jwt = require("jsonwebtoken");

module.exports = function(User , secret){

	var authRouter = express.Router();

	authRouter.route('/')
	
		.post(function(req,res){

			var data = req.body;

			User.findOne({ username : data.username } , function(err, user){

				if(err){
					res.json({ status : "error", info : err}).status(500);
				}
				
				if(!user){
					res.json({ status : "error" , info : "User Not Found" }).status(404);
				}
				else if( user ){

					if(user.password != data.password ){
						res.json({ status : "error" , info : "Password Not Matched" }).status(404);
					}
					else{

						var token = jwt.sign( user , secret , {
							expiresIn: 10 
						});

						res.json({
				          status: "success",
				          info: 'Enjoy your token!',
				          token: token
				        });

					}
				}

			});

		});


	return authRouter;
};