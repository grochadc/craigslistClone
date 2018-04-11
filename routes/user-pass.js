var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    middleware = require('../libs/middleware');

    router.get("/:user_id/changePass",middleware.checkUserPermission(),function(req,res){
        User.findById(req.params.user_id, function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                res.render("user-password",{user: foundUser});
            }
        });
    });

    router.post("/changePass", function(req, res){
      var updateID = req.body.ID;
      var pwd = req.body.password;
      if(!updateID) res.send('No id passed');
      User.findById(updateID, function(err, user){
        if(err) console.log(err);
        else{
          user.setPassword(pwd, function(){
            user.save();
            res.send('Password reset succesfully');
          });
        }
      });
    });

    module.exports = router;
