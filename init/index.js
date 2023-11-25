const mongoose = require('mongoose');
const initData = require('./data.js')
const Listing = require('../models/listing.js')
const URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect(URL);
}

main().then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log(err);
})

const insertDB = async (req,res)=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({ ...obj ,owner : "65464ef82ad38537e1cffb05"}));
    await Listing.insertMany(initData.data);
    console.log('data inserted')
}

insertDB();