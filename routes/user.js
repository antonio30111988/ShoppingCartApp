var express = require('express');
var router = express.Router();

var Product=require('../models/product');
var passport=require('passport');

//include csurf session for CSRF
//npm install csurf --save
var csrf=require('csurf');

//include session package
// npm install --save express-session

var csrfProtection=csrf();
router.use(csrfProtection);


/*GET SIGN UP FORM*/
router.get('/signup',function(req,res,next){
	//errors stored in error
	var messages=req.flash('error');
	res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors: messages.length>0});
});

//SIGNUP PACKAGES
//npm install --save passport -passeord manipulation
//npm install --save bcrypt nodejs -password encription
//npm install --save connect-flash -flash messages display
router.post('/signup',
	//call startegy by authenticate
	passport.authenticate('local.signup',{
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	//use connect-flash package enabled
	failureFlash: true
}));

//user profile
router.get('/profile',function(req,res,next){
	res.render('user/profile');
});

//sign in route
//get login
router.get('/login',function(req,res,next){
	var messages=req.flash('error');
	res.render('user/login',{csrfToken:req.csrfToken(),messages:messages,hasErrors: messages.length>0});

});

//post login
router.post('/login',
	//call startegy by authenticate
	passport.authenticate('local.signin',{
	successRedirect: '/user/profile',
	failureRedirect: '/user/login',
	//use connect-flash package enabled
	failureFlash: true
}));

module.exports = router;