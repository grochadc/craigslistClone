var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user"),
    middleware = require('../libs/middleware');

    router.get("/:user_id/dashboard",function(req,res){
        User.findById(req.params.user_id).populate("ads").exec(function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                res.render("dashboard",{user: foundUser});
            }
        });
    });

    module.exports = router;
