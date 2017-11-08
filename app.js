var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    Ad = require("./models/ad"),
    User = require("./models/user"),
    seedDB = require("./seeds");

var app = express();
app.set('view engine','ejs');

mongoose.connect("mongodb://localhost/craigslist");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
seedDB();


app.get("/craigslist",function(req,res){
    Ad.find({},function(err,ads){
        if(err){
            console.log(err);
        }else{
            res.render("index",{ads: ads});
        }
    });
});

app.get("/",function(req,res){
    res.redirect("/craigslist");
});

app.get("/craigslist/new",function(req,res){
    res.render("new");
})

app.post("/craigslist/new",function(req,res){
    Ad.create(req.body.ad,function(err,ad){
        if(err){
            console.log(err);
        }else {
            res.redirect("/craigslist");
        }
    })
})

app.get("/craigslist/:id",function(req,res){
    Ad.findById(req.params.id,function(err,foundPost){
        if(err){
            console.log(err);
        }else{
            User.findById(foundPost.contact,function(err,user){
                if(err){
                    console.log(err);
                }else{
                    res.render("show",{ad: foundPost, user: user});
                }
            });
        }
    });
});

app.get("/craigslist/:id/edit",function(req,res){
    Ad.findById(req.params.id,function(err,foundAd){
        if(err){
            console.log(err);
        }else{
            res.render("edit",{ad: foundAd});
            // console.log(foundAd.title);
        }
    })
});

app.put("/craigslist/:id",function(req,res){
    Ad.findByIdAndUpdate(req.params.id,req.body.ad,function(err,foundAd){
        if (err){
            console.log(err);
        }else{
            res.redirect("/craigslist/"+foundAd._id)
        }
    })
});

app.delete("/craigslist/:id",function(req,res){
    Ad.findByIdAndRemove(req.params.id,function(err,foundAd){
        if(err){
            console.log(err);
        }else{
            res.redirect("/craigslist");
        }
    })
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("craigslist server has started");
})