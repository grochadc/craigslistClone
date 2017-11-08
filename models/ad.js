var mongoose = require("mongoose");

var adSchema = new mongoose.Schema({
    title: String,
    price: String,
    image: String,
    description: String,
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {type: Date, default: Date.now}
});

// var Ad = mongoose.model("Ad",adSchema);

module.exports = mongoose.model("Ad",adSchema);