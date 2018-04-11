var Ad = require("../models/ad");
module.exports = {

  //MIDDLEWARE
  isLoggedIn: function (req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect("/login");
  },

  requireAdmin: function () {
    return function(req, res, next) {
      if (!req.user.isAdmin) {
        res.status(403).render("403forbidden");
      }
      else next();
    };
  },

  checkUserPermission: function(){
    return function(req, res, next){
      if(req.user.id == req.params.user_id || req.user.username == 'admin') next();
      else res.status(403).render("403forbidden");
    };
  },

  checkAdOwnerShip: function (req, res, next){
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
};
