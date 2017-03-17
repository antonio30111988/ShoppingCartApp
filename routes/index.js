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

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err,docs){
		var productBlocks=[];
		var blockSize=3;
		for(var i=0; i< docs.length;i+=blockSize){
			productBlocks.push(docs.slice(i,i+blockSize));
		}
  		res.render('shop/index', { title: 'Shopping Cart', products: productBlocks });
  	});
});

/*GET SIGN UP FORM*/
router.get('/user/signup',function(req,res,next){
	res.render('user/signup',{csrfToken:req.csrfToken()});
});

//SIGNUP PACKAGES
//npm install --save passport -passeord manipulation
//npm install --save bcrypt nodejs -password encription
//npm install --save connect-flash -flash messages display
router.post('/user/signup',
	//call startegy by authenticate
	passport.authenticate('local.signup'),{
	successRedirect: '/profile',
	failureRedirect: '/signup',
	//use connect-flash package enabled
	failureFlash: true
}));

router.get('/profile',function(req,res,next){
	res.render('user/profile');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping Cart' });
});

module.exports = router;
