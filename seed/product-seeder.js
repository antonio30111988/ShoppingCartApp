var Product=require('../models/product');

var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/node-shopping');

var products=[
	new Product({
		imagePath: '/images/callofduty.jpg',
		title: 'Call of Duty Game',
		description: 'The game about World Wars. Very exciting. try it now !',
		price: 11,
	}),

    new Product({
		imagePath: '/images/dota.jpg',
		title: 'Dota 2',
		description: 'The worlwide popular startegy game. Mass of people joyfully addicted to it!',
		price: 25,
	}), 
	new Product({
		imagePath: '/images/farcry.jpg',
		title: 'Far Cry 3',
		description: 'Shooting game , with incredible graphic quality and excitiong missions all around',
		price: 16,
	}),
	new Product({
		imagePath: '/images/worms.jpg',
		title: 'Warms 3',
		description: 'The  fun game for all generations!',
		price: 7,
	}),
	new Product({
		imagePath: '/images/quake.jpg',
		title: 'Quake 3',
		description: 'The old,legendary video game with shooting missions  !',
		price: 13,
	}),
	new Product({
		imagePath: '/images/fifa.jpg',
		title: 'FIFA 2017',
		description: 'The most popular footbal video game provide by FIFA to you !',
		price: 22,
	})
];

var done=0;
for (var i=0 ; i < products.length;i++){
	products[i].save(function(err,result){
		done++;
		if(done===products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}