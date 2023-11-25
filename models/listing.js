const mongoose = require('mongoose');
const Review = require('./review.js');

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    description: String,
    image : {
        filename: String,
        url : String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review',
        },
    ],
    owner : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    category : {
        type : String,
        enum : ['Mountain','Farm','Iconic-city','Castels','Awsome-pools','Rooms','Camping','Arctic','Dome','Boats'],
    } 
    
});

// it will delete all reviews( collection in database) when a whole listing is deleted 

listingSchema.post('findOneAndDelete', async (listing) => {
    if(listing.reviews.length){
        await Review.deleteMany({_id : { $in : listing.reviews}});
    }
   
})

const listing = mongoose.model('listing',listingSchema);

module.exports = listing;