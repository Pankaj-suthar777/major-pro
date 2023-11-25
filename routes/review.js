const express = require('express');
const router = express.Router( { mergeParams : true});
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {reviewSchema} = require('../schema.js');
const { isLogged } = require('../middleware.js');
const reviewControll = require('../controllers/review.js')

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
       throw new ExpressError(400,error);
    } else {
       next();
    }
   }

// review - post 
router.post('/',isLogged, wrapAsync(reviewControll.createReview),validateReview)
    
//review - delete
    
router.delete('/:reviewId',reviewControll.deleteReview);

module.exports = router;
    