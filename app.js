var express = require('express');
var jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var config = require("./config");
mongoose.connect(config.database);

var port = process.env.PORT || 3000;

var app = express();

var userModel = require("./models/user"); 
var userRouter = require('./routes/userRouter')(userModel);
var authRouter = require('./routes/authRouter')(userModel , config.secret);

var tokenCheck = require('./TokenCheck.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
  res.json({ status : "active" , api : "http://localhost:"+port+"/api" }).status(200);
});

app.use('/api/auth', authRouter);



app.use(tokenCheck);
app.use('/api/users', userRouter);



app.listen(port , function(){
  console.log("Server is listening on http://localhost:"+ port );
});



 