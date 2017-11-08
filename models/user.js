var mongoose = require("mongoose");
// var Ad = require("ad");
var userSchema = new mongoose.Schema({
    password: String,
    email: String,
    ads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ad"
        }]
});

module.exports = mongoose.model("User",userSchema);