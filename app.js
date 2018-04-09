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


  mongoose.connect("mongodb://localhost/craigslist", {useMongoClient: true});
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
var homepage = require('./routes/homepage');
app.use('/', homepage);

// DASHBOARD ROUTE
var dashboard = require('./routes/dashboard');
app.use('/', dashboard);

// REGISTER ROUTES
var register = require('./routes/register');
app.use('/', register);

// LOGIN/LOGOUT ROUTES
var login = require('./routes/login');
app.use('/', login);

// CRAIGSLIST LISTING ROUTES
var listing = require('./routes/listing');
app.use('/', listing);

// LEVELS routes
var levels = require('./routes/levels');
app.use('/', levels);

// collection.update(
//   { _id: id },
//   { $pull: { 'contact.phone': { number: '+1786543589455' } } }
// );

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("craigslist server has started");
});
