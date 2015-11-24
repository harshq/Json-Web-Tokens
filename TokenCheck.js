module.exports = function (req,res,next) {

     var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if(token){
        jwt.verify(token , config.secret , function(err, decode){
          if(err){

            res.json({ status : "error", error : "Authentication Failed" }).status(500);

          }else{

            req.decode = decode;
            next();
          }
        });

     }else{

         res.json({ status : "error", error : "No Token Found" }).status(401);

     }

}