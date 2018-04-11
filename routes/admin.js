var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    middleware = require('../libs/middleware');

    router.use(middleware.isLoggedIn);
    router.use(middleware.requireAdmin());

    router.get("/", function(req, res){
      User.find({}, function(err, users){
        if(err) console.log(err);
        else res.render("admin/admin-dashboard", {users: users});
      });
    });

    router.get("/deleteUser", function(req, res){
      var deleteID = req.query.ID;
      if(!deleteID) res.send('No id passed');
      User.findByIdAndRemove(deleteID, function(err, user){
        if(err) console.log(err);
        else res.send('Removed user '+user.username+' and ID '+user.id);
      });
    });

    router.post("/updatePwd", function(req, res){
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

    router.get("/updatePwd", function(req, res){
      userID = req.query.ID;
      User.findById(userID, function(err, user){
        if(err) console.log(err);
        else res.render("admin/update-pwd", {user: user});
      });
    });

module.exports = router;
