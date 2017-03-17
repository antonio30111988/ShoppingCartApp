var passport=require('passport');
var User=require('../models/user');
var LocalStrategy=require('passport-local').Strategy;

//user session functionality manipulation
//serialize before and unserialize after request login is done, auth user to session, (by user_id)
passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser(function(id, done) {
	//mongoose
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//middleware
//create User, with new local startegy
passport.use('local.signup',new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	//under inlcude req parameter to calllback function as first
	passReqToCallback: true
},function(req,email, password, done){
	//validate request paarams
	req.checkBody('email','Invalid email address').notEmpty().isEmail();
	req.checkBody('password','Invalid password').notEmpty().isLength({min:4});

	//assign and extract errors
	var errors=req.validationErrors();
	if(errors){
		var messages=[];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
			//registrate messages to error object
		return done(null, false,req.flash('error',messages));
	}	

	User.findOne({'email':email},function(err,user){
		if(err){
			return done(err);
		}
		//if user exist pass message to session that exist and return no object set to false as 2nd argument inside functiuon
		//3rd parameter is alweqyss additpnal FLASH message stored in session
		if(user){
			return done(null,false,{message: 'This email is already in use. Please try with another one!!'});
		}

		//create user
		var newUser=new User();
		newUser.email=email;
		newUser.password=newUser.encryptPassword(password);
		newUser.save(function(err,res){
			if(err){
				return done(err);
			}
			return done(null,newUser);
		});
	});
}));

//login startegy
passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	//under inlcude req parameter to calllback function as first
	passReqToCallback: true
},function(req,email,password,done){
	//validate request paarams
	req.checkBody('email','Invalid email address').notEmpty().isEmail();
	req.checkBody('password','Invalid password').notEmpty();

	//assign and extract errors
	var errors=req.validationErrors();
	if(errors){
		var messages=[];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
			//registrate messages to error object
		return done(null, false,req.flash('error',messages));
	}

	User.findOne({'email':email},function(err,user){
		if(err){
			return done(err);
		}
		//if no user and password exist pass message to session that exist and return no object set to false as 2nd argument inside functiuon
		//3rd parameter is alweqyss additpnal FLASH message stored in session
		if(!user){
			return done(null,false,{message: 'No such a user..'});
		}
		if(!user.validatePassword(password)){
			return done(null,false,{message: 'Wron password..'});
		}
			//login passedd return logged in user object
		return done(null,user);
	});	
			
}));