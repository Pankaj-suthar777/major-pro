const Listing = require('./models/listing.js');


module.exports.isLogged = (req,res,next)=>{ 
     if(!req.isAuthenticated()){
      req.session.redirectURL = req.originalUrl;
        req.flash('error','you must be logged in!');
        return res.redirect('/login')
     }
     next();
    }

module.exports.saveRedirectURL = (req,res,next) => {
   if(req.session.redirectURL){
   res.locals.redirectUrl = req.session.redirectURL;
}
next()
}

module.exports.ownerOfListing = async (req,res,next)=>{
   let {id} = req.params;
   let listing = await Listing.findById(id);
   if( !listing.owner.equals(res.locals.currUser._id)){
      req.flash('error','you are not owner of this listing');
     return res.redirect(`/listing/${id}`);
  }
  next()
}