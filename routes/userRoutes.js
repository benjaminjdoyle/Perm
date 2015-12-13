"use strict";
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
// let Prospect = mongoose.model('Prospect');
let User = mongoose.model('User');
let jwt = require ('express-jwt');
let auth = jwt({
	userProperty: 'payload',
	secret: 'super secret salt'
});


// POST /api/v1/users/register
router.post('/register', (req, res, next) => {
	if (!req.body.email || !req.body.password) return next('Include an email and password.');
	let user = new User();
	user.local.username = req.body.username;
	user.local.email = req.body.email;
	user.CreateHash(req.body.password, (err, hash) => {
		if (err) return next(err);
		user.local.password = hash;
		user.save((err, result) => {
    		if(err) return next(err);
    		if(!result) return next('Could not create the User.');
    		res.send({ token : result.generateJWT() });
	});
  });
});

// POST /api/v1/users/login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		if(err) return next(err);
		res.send({ token: user.generateJWT() });
	})(req, res, next);
});


module.exports = router;