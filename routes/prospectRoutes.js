'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Prospect = mongoose.model('Prospect');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
	userProperty: 'payload',
	secret: 'super secret salt'
});

router.delete('/:id', (req, res, next) => {
	Prospect.remove({
		_id: req.params.id
	}, (err, result) => {
		if(err) return next(err);
		User.findOneAndUpdate({
			'prospects': req.params.id
		}, {
			$pull: {
				prospects: req.params.id
			}
		}, (err, result) => {
			if(err) return next(err);
			res.send(result);
		});
	});
});

router.put('/:id', (req, res, next) => {
	Prospect.update({ _id : req.params.id }, req.body, function(err, result) {
		if(err) return next(err);
		if(!result) return next('Prospect not found!');
		res.send(result);
	});
});

router.get('/', auth, (req, res, next) => {
	Prospect.find({})
		// .sort('-dateCreated')
		.exec((err, result) => {
			if(err) return next(err);
			res.send(result)
		})
})

router.post('/', auth, (req, res, next) => {
	if(!req.body.name) return next('Please include a prospective employer');
	let prospect = new Prospect(req.body);
	prospect.createdBy = req.payload._id;
	prospect.name = req.body.name;
	prospect.save((err, result) => {
		if(err) return next(err);
		if(!result) return next('Could not create prospect');
		User.update({ _id : req.payload._id }, { $push: { prospects : result._id }}, (err, user) => {
			if(err) return next(err);
			if(!user) return next('Could not push prospect into user');
			res.send(result);
		});
	});
});

module.exports = router;