var express = require('express');
var router = express.Router();

var Product=require('../models/product');

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

/*Homepage*/
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping Cart' });
});*/

module.exports = router;
