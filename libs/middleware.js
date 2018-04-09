module.exports = {

  //MIDDLEWARE
  isLoggedIn: function (req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect("/login");
  },

<<<<<<< HEAD
<<<<<<< HEAD
  requireAdmin: function () {
    return function(req, res, next) {
      if (!req.user.isAdmin) {
        res.status(403).render("403forbidden");
      }
      else next();
    };
  },

=======
>>>>>>> 7e49a08... Modularize custom middleware (isLoggedIn and checkAdOwnerShip)
=======
>>>>>>> 170db9c... Modularize custom middleware (isLoggedIn and checkAdOwnerShip)
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
