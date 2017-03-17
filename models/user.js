var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema=new Schema({
	email: {type:String, required:true},
	password: {type:String, required:true}
});

//HELPER METODE

//add methods to schema
userSchema.methods.encryptPassword=function(password){
	//get enripted password
	return bcrypt.hashSync(password,bcrypt.genSaltSync(7),null);
};

userSchema.methods.validatePassword=function(password){
	//check if pass is right
	return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User',userSchema); 