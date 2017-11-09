var mongoose    = require("mongoose"),
    Ad          = require("./models/ad"),
    User        = require("./models/user");

mongoose.connect("mongodb://localhost/craigslist");


var data = [
    {
        email: "bob@gmail.com",
        // password: "password",
    },
    {
        email: "joe@gmail.com",
        // password: "password"
    }
];

var bobs_ads = [
        {
            title: "New Bike",
            price: "$30",
            image: "https://i5.walmartimages.com/asr/48a8a59a-3285-4d57-8658-c5460a0d7d92_1.b7a6050ee7570f3673ecf18424dc0021.jpeg",
            description: "Brand new mountain bike. Barely ridden. I just can't keep it any longer because I'm moving to the city."
        },
        {
            title: "Eggplant for Sale",
            price: "$3.50",
            image: "https://cdn1.medicalnewstoday.com/content/images/articles/279/279359/eggplants.jpg",
            description: "Turns out, I'm not a big fan of eggplants. Would like to get this out of my fridge ASAP."
        }
    ];

var joes_ads = [
    {
        title: "Tomato for Sale",
        price: "$10",
        image: "http://freshsabjimandi.com/wp-content/uploads/2017/04/Tomato.jpg",
        description: "I need to get rid of this tomato before it goes bad. Looking for a good home."
    },
    {
        title: "Helmet for Sale",
        price: "$10",
        image: "https://images-na.ssl-images-amazon.com/images/I/51jYI8A4i4L._SX355_.jpg",
        description: "I'm selling this helmet because it's too much for me to wear."
    },
    {
        title: "TV for Sale",
        price: "$250",
        image: "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/103/10317/10317673.jpg",
        description: "Brand New, In box."
    }
    ];


function addBob(){
    bobs_ads.forEach(function(ad){
        Ad.create(ad,function(err,createdAd){
            if(err){
                console.log(err);
            }else{
                User.findOne({email: "bob@gmail.com"},function(err,foundUser){
                    if(err){
                        console.log(err);
                    }else{
                        // console.log(foundUser);
                        createdAd.set({contact: foundUser._id});
                        createdAd.save(function(err,data){
                            if(err){
                                console.log(err);
                            }else{
                                foundUser.ads.push(data);
                                foundUser.save();
                            }
                        })
                    }
                })
            }
        })
    })
}

function addJoe(){
    joes_ads.forEach(function(ad){
        Ad.create(ad,function(err,createdAd){
            if(err){
                console.log(err);
            }else{
                User.findOne({email: "joe@gmail.com"},function(err,foundUser){
                    if(err){
                        console.log(err);
                    }else{
                        // console.log(foundUser);
                        createdAd.set({contact: foundUser._id});
                        createdAd.save(function(err,data){
                            if(err){
                                console.log(err);
                            }else{
                                foundUser.ads.push(data);
                                foundUser.save();
                            }
                        })
                    }
                })
            }
        })
    })    
}

function seedDB(){
    User.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("All Users removed");
            Ad.remove({},function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("All Ads Removed");
                    data.forEach(function(user){
                        User.create(user,function(err,user){
                            if(err){
                                console.log(err);
                            }else{
                                if(user.email == "bob@gmail.com"){
                                    addBob();
                                }else{
                                    addJoe();
                                }
                            }
                        });
                    });
                }
            })
    
        }
    })    
}

module.exports = seedDB;