var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user");

router.get("/craigslist",function(req,res){
    Ad.find({},function(err,ads){
        if(err){
            console.log(err);
        }else{
            res.render("index",{ads: ads});
        }
    });
});

router.get("/",function(req,res){
    res.redirect("/craigslist");
});

module.exports = router;
