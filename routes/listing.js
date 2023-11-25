const express = require('express');
const router = express.Router( { mergeParams : true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema} = require('../schema.js');
const {isLogged,ownerOfListing} = require('../middleware.js')
const listingcontroll = require('../controllers/listing.js')
const { storage } = require('../cloudinaryConfig.js')
const multer  = require('multer')
const upload = multer({ storage })
const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
       throw new ExpressError(400,error);
    } else {
       next();
    }
   }
   
   router.route('/')
   .get(listingcontroll.showAllListing)
   .post(/*validateListing,*/upload.single('image'),isLogged,wrapAsync(listingcontroll.createNewListing))

   router.get('/searchListing',listingcontroll.searchListing)

   //new listing route 
   router.get('/new',isLogged,listingcontroll.newListing)


   router.route('/:id')
   .get(wrapAsync(listingcontroll.showListing)) 
   .put(upload.single('image'),ownerOfListing,isLogged,wrapAsync(listingcontroll.editListingPut))
   .delete(ownerOfListing,isLogged,wrapAsync(listingcontroll.deleteListing))


//Edit route
router.get('/:id/edit',isLogged,wrapAsync(listingcontroll.editListing))




module.exports = router;