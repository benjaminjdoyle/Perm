'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  local: {
  	username: String,
  	email: {
  		type: String,
  		sparse: true,
  		lowercase: true,
  		trim: true, //what does this do
  		unique: true
  		},
  	password: String
  },
  backgroundPicUrl: String,
  // : { type: String, enum: ['option-1', 'option-2', 'option-3']}, what does enum do?
  prospects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prospect' }]
});

UserSchema.methods.CreateHash = function(password, cb) {
	let SALT_ROUNDS = 10;
	if (process.env.NODE_ENV === 'test') SALT_ROUNDS = 1;
	bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
		if(err) return cb(err);
		bcrypt.hash(password, salt, (err, hash) => {
			if(err) return cb(err);
			cb(null, hash);
		});
	});
};
UserSchema.methods.validatePassword = function(password, hash, cb) {
	bcrypt.compare(password, hash, (err, res) => {
		//if there is an error 'return' which will stop the function and return the error callback
		if(err) return cb(err);
		cb(null, res); //res should be true or false
	});
};

UserSchema.methods.generateJWT = function() {
	return jwt.sign({
		_id: this._id,
		username: this.local.username,
		email: this.local.email
	}, 'super secret salt');
};





module.exports = mongoose.model('User', UserSchema);







