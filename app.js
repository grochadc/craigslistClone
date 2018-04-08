var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    passport = require("passport"),
    Ad = require("./models/ad"),
    User = require("./models/user");
    // seedDB = require("./seeds");

var app = express();
var ObjectId = require('mongodb').ObjectID;
app.set('view engine','ejs');

app.use(require("express-session")({
    secret: "test one two three",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb://localhost/craigslist");
// mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
// seedDB();

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//======================ROUTES============================
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

// DASHBOARD ROUTE
app.get("/:user_id/dashboard",function(req,res){
    User.findById(req.params.user_id).populate("ads").exec(function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("dashboard",{user: foundUser});
        }
    });
});

// REGISTER ROUTES
app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
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

// LOGIN ROUTES
app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",{
    failureRedirect: "/login"
}),function(req,res){
    User.findOne({username: req.body.username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.redirect("/"+foundUser._id+"/dashboard");
        }
    });
});

// LOGOUT ROUTE
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});


// CRAIGSLIST LISTING ROUTES
app.get("/craigslist/new",isLoggedIn,function(req,res){
    res.render("new");
});

app.post("/craigslist/new",isLoggedIn,function(req,res){
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
                    // console.log(currentUser);
                    // console.log(user);
                }
            });
        }
    });
});

app.get("/craigslist/:id/edit",checkAdOwnership,function(req,res){
    Ad.findById(req.params.id,function(err,foundAd){
        if(err){
            console.log(err);
        }else{
            res.render("edit",{ad: foundAd});
            // console.log(foundAd.title);
        }
    });
});

app.put("/craigslist/:id",checkAdOwnership,function(req,res){
    Ad.findByIdAndUpdate(req.params.id,req.body.ad,function(err,foundAd){
        if (err){
            console.log(err);
        }else{
            res.redirect("/craigslist/"+foundAd._id);
        }
    });
});

app.delete("/craigslist/:id",checkAdOwnership,function(req,res){
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

// collection.update(
//   { _id: id },
//   { $pull: { 'contact.phone': { number: '+1786543589455' } } }
// );

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkAdOwnership(req, res, next){
    if(req.isAuthenticated()){
        Ad.findById(req.params.id,function(err,foundAd){
            if(err){
                res.redirect("back");
            }else{
                if(foundAd.contact == req.user._id){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("craigslist server has started");
});
