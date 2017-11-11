var mongoose = require("mongoose"),
    User = require("./models/user"),
    Ad = require("./models/ad"),
    userId = "5a039c733c4ddb306ffa69d3",
    adId = "5a0677a1b371c13d93b85ac0";

mongoose.connect("mongodb://localhost/craigslist");

User.findById(userId,function(err,foundUser){
    if(err){
        console.log(err);
    }else{
        var ads_array = foundUser.ads;
        ads_array.forEach(function(ad){
            foundUser.ads.pull(ad);
            foundUser.save(function(err,data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                }
            })
        })
    }
})