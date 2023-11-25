const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectURL } = require('../middleware.js')
const usercontroll = require('../controllers/user.js')

router.route('/signup')
.get(usercontroll.signupPage)
.post( wrapAsync(usercontroll.signupPost))

router.route('/login')
.get(usercontroll.loginPage)
.post(saveRedirectURL,
passport.authenticate('local',
{ failureRedirect : '/login',
failureFlash : true
}),
 usercontroll.loginPost);

router.get('/logout',usercontroll.logout)

module.exports = router;