const { Schema, model } = require("mongoose");

const LoginCredentialSchema = new Schema({
	emailaddress: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: false,
	},
	surname: {
		type: String,
		required: false,
	},
	wallPhoto: {
		type: String,
		required: false,
	},
	profilePhoto: {
		type: String,
		required: false,
	},
});

const LoginCredential = model("loginCredential", LoginCredentialSchema);

module.exports = LoginCredential;
