var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    passport = require("passport");

    router.get("/register",function(req,res){
        res.render("register");
    });

    router.post("/register",function(req,res){
        User.register(new User({username: req.body.username}), req.body.password,function(err,user){
            if(err){
                console.log(err);
                return res.redirect("/register");
            }else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/"+user.id+"/dashboard");
                });
            }
        });
    });

    module.exports = router;
