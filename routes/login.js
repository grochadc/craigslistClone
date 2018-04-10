var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    passport = require("passport");

    //LOGIN ROUTE
    router.get("/login",function(req,res){
        res.render("login");
    });

    router.post("/login", passport.authenticate("local",{
        failureRedirect: "/login"
    }),function(req,res){
        User.findOne({username: req.body.username},function(err,foundUser){
            if(err){
                console.log(err);
            }else if(foundUser.username == 'admin'){
                res.redirect("/admin");
            }
            else res.redirect("/"+foundUser._id+"/dashboard");
        });
    });

    // LOGOUT ROUTE
    router.get("/logout", function(req,res){
        req.logout();
        res.redirect("/");
    });

    module.exports = router;
