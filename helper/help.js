module.exports = {
    isLogedIn: function(req,res,next){
      if(req.isAuthenticated()){
        return next(), console.log("OKKKKLKKKKKKKKKKKKKKKKKKK");
      }
    }
  }