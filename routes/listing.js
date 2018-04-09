var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    middleware = require('../libs/middleware');

    router.get("/craigslist/new", middleware.isLoggedIn, function(req,res){
        res.render("new");
    });

    router.post("/craigslist/new",middleware.isLoggedIn,function(req,res){
        Ad.create(req.body.ad,function(err,ad){
            if(err){
                console.log(err);
            }else {
                ad.set({contact: req.user._id});
                ad.save(function(err,data){
                    if(err){
                        console.log(err);
                    }else{
                        req.user.ads.push(data);
                        req.user.save();
                    }
                });
                res.redirect("/craigslist");
            }
        });
    });

    router.get("/craigslist/:id",function(req,res){
        Ad.findById(req.params.id,function(err,foundPost){
            if(err){
                console.log(err);
            }else{
                User.findById(foundPost.contact,function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                        res.render("show",{ad: foundPost, user: user});
                        // console.log(currentUser);
                        // console.log(user);
                    }
                });
            }
        });
    });

    router.get("/craigslist/:id/edit",middleware.checkAdOwnerShip, function(req,res){
        Ad.findById(req.params.id,function(err,foundAd){
            if(err){
                console.log(err);
            }else{
                res.render("edit",{ad: foundAd});
                // console.log(foundAd.title);
            }
        });
    });

    router.put("/craigslist/:id", middleware.checkAdOwnerShip, function(req,res){
        Ad.findByIdAndUpdate(req.params.id,req.body.ad,function(err,foundAd){
            if (err){
                console.log(err);
            }else{
                res.redirect("/craigslist/"+foundAd._id);
            }
        });
    });

    router.delete("/craigslist/:id", middleware.checkAdOwnerShip, function(req,res){
        Ad.findByIdAndRemove(req.params.id,function(err,foundAd){
            if(err){
                console.log(err);
            }else{
                User.findById(req.user._id,function(err,foundUser){
                    if(err){
                        console.log(err);
                    }else{
                        foundUser.ads.pull(req.params.id);
                        foundUser.save(function(err,data){
                            if(err){
                                console.log(err);
                            }else{
                                res.redirect("/"+req.user._id+"/dashboard");
                            }
                        });
                    }
                });
                res.redirect("/craigslist");
            }
        });
    });
    module.exports = router;
