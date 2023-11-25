const express = require('express');
const router = express.Router( { mergeParams : true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const cateControll  = require('../controllers/category.js')

router.get('/category/Mountain', cateControll.mountain)

router.get('/category/Farm', cateControll.farm)

router.get('/category/IconicCity', cateControll.iconic)

router.get('/category/Castels', cateControll.castel)

router.get('/category/AwsomePools', cateControll.awsomePool)

router.get('/category/Rooms', cateControll.rooms)

router.get('/category/Camping', cateControll.camping)

router.get('/category/Arctic', cateControll.arctic)

router.get('/category/Dome', cateControll.dome)

router.get('/category/Boats', cateControll.boats)

module.exports = router;