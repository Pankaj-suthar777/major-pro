const { models } = require("mongoose");
const User = require("../models/user.js");

module.exports.signupPage = (req,res)=>{
    res.render('user/signup.ejs');
}

module.exports.signupPost = async (req,res)=>{
    try {
        let { email,password,username} = req.body;
        let newUser =  new User({email,username});
        let registerdUser = await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,()=>{
            req.flash('success','Welcome To Wanderlust!');
            res.redirect('/listing');
        })
        
    } catch(err) {
        req.flash('error',err.message)
        res.redirect('/signup')
    }
    
}

module.exports.loginPage = async (req,res)=>{
    res.render('user/login.ejs')
}

module.exports.loginPost = async (req,res)=>{
    req.flash('success','Welcome back to Wanderlust!');
    let redirectUrl = res.locals.redirectUrl || '/listing'
    res.redirect(redirectUrl)
    
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
         return next(err);
        }
        req.flash('success','you are logout now')
        res.redirect('/listing');

    })
}