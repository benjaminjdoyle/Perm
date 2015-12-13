'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let ProspectSchema = new mongoose.Schema({
	name: { type: String, require: true},
	contact: {
		name: String,
		email: {
			type: String,
			sparse: true,
			lowercase: true,
			trim: true,
			unique: true, 
		},
		phone: Number
	},
	nextStep: String,
	notes: String,
	dateCreated: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Prospect', ProspectSchema);