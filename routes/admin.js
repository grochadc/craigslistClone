var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    middleware = require('../libs/middleware');

    router.get("/", middleware.isLoggedIn,middleware.requireAdmin(),function(req, res){
      User.find({}, function(err, users){
        if(err) console.log(err);
        else res.render("admin-dashboard", {users: users});
      });
    });

    router.get("/deleteUser", middleware.isLoggedIn,middleware.requireAdmin(),function(req, res){
      deleteID = req.query.ID;
      console.log('req.query.ID ',deleteID);
      if(!deleteID) res.send('No id passed');
      User.findByIdAndRemove(deleteID, function(err, user){
        if(err) console.log(err);
        else res.send('Removed user '+user.username+' and ID '+user.id);
      });
    });



module.exports = router;
