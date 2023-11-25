const Listing = require('../models/listing.js')

module.exports.mountain = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Mountain'})
        res.render('category/category.ejs',{cateListings})
    }

module.exports.farm = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Farm'})
        res.render('category/category.ejs',{cateListings})
}

module.exports.iconic = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Iconic-city'})
        res.render('category/category.ejs',{cateListings})
    }

module.exports.castel = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Castels'})
        res.render('category/category.ejs',{cateListings})
}
module.exports.awsomePool = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Awsome-pools'})
        res.render('category/category.ejs',{cateListings})
    }

module.exports.rooms = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Rooms'})
        res.render('category/category.ejs',{cateListings})
}
module.exports.camping = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Camping'})
        res.render('category/category.ejs',{cateListings})
    }

module.exports.arctic = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Arctic'})
        res.render('category/category.ejs',{cateListings})
}
module.exports.dome = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Dome'})
        res.render('category/category.ejs',{cateListings})
    }

module.exports.boats = async (req,res) => {
        let cateListings = await Listing.find({ category : 'Boats'})
        res.render('category/category.ejs',{cateListings})
}