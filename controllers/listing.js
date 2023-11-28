const Listing = require('../models/listing.js')

module.exports.showAllListing = async (req,res)=>{
    let allListings = await Listing.find();
    res.render('listings/showAll.ejs',{ allListings })
}

module.exports.newListing = (req,res)=>{
    res.render('listings/new.ejs')
}

module.exports.showListing = async (req,res)=>{
    let { id } = req.params;
    let detailOfListing =  await Listing.findById(id).populate({path : 'reviews', populate : { path : 'author'}}).populate('owner');
    if(!detailOfListing){
        req.flash('error','Listing you requested for does not exist');
        res.redirect('/listing')
    }
    res.render('listings/show.ejs',{detailOfListing})
}

module.exports.createNewListing = async (req,res,next)=>{
    let {title,description,price,country,location,category} = req.body;
    let newListing = {
     title : title,
     description : description,
     image : {
        filename : req.file.filename,
        url : req.file.path
     },
     price : price,
     country:country,
     location:location,
     owner : req.user._id,
     category : category
    }
 
    let newL = new Listing(newListing);
    await newL.save();
    req.flash('success','Listing Created Successfully!') 
    
    res.redirect('/listing')
}

module.exports.editListing = async (req,res)=>{
    let {id} =req.params;
    let listing = await Listing.findById(id);
    let orignalImage = listing.image.url.replace('/upload','/upload/w_250')
    res.render('listings/edit.ejs',{listing,orignalImage});
}

module.exports.editListingPut = async (req,res)=>{
    let {id} =req.params;
   
    let {title,description,image,price,country,location,category} = req.body;
    let newListing = {
     title : title,
     description : description,
     price : price,
     country:country,
     location:location,
     category:category
    }
    await Listing.findByIdAndUpdate(id,newListing);
    
    if(typeof req.file != 'undefined'){
    
    newListing = {
        image : {
            url : req.file.path,
            filename : req.file.filename
        }
    }
    await Listing.findByIdAndUpdate(id,newListing);
    }
    req.flash('success','Listing Edited!')
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Listing Deleted!')
    res.redirect('/listing')
}
module.exports.searchListing = async (req,res)=>{
    let {search} = req.query;

 let searchedWord = search;
let searchResult = await Listing.find({$or: [{ title : search},{location :search},{country:search}]} );
   res.locals.searchList = searchResult
  res.render('listings/search.ejs',{searchResult})
}

