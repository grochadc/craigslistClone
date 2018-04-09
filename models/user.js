var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
// var Ad = require("ad");
var userSchema = new mongoose.Schema({
    password: String,
    username: String,
    email: String,
    isAdmin: {type: Boolean, default: false},
    ads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ad"
        }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
