var express = require('express'),
    router = express.Router(),
    Ad = require("../models/ad"),
    User = require("../models/user");

router.get("/level",function(req,res){
  var lvl = req.query.q;
    Ad.find({level: lvl},function(err,ads){
        if(err){
            throw err;
        }else if(ads.length){
            res.render("index",{ads: ads});
        }
        else {
          res.render("404");
        }
    });
});

module.exports = router;
