var mongoose = require("mongoose");

var adSchema = new mongoose.Schema({
    title: String,
    price: String,
    image: String,
    description: String,
    level: String,
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    phone: String,
    date: {type: Date, default: Date.now}
});

// var Ad = mongoose.model("Ad",adSchema);

module.exports = mongoose.model("Ad",adSchema);
