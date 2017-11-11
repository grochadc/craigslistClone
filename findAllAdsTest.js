var mongoose = require("mongoose"),
    User = require("./models/user"),
    Ad = require("./models/ad"),
    userId = "5a039c733c4ddb306ffa69d3";

mongoose.connect("mongodb://localhost/craigslist");

User.findById(userId).populate("ads").exec(function(err,user){
    if(err){
        console.log(err);
    }else{
        user.ads.forEach(function(ad){
            console.log(ad.title);
        })
    }
})