const { Schema, model } = require("mongoose");

const LoginCredentialSchema = new Schema({
	username: {
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
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	wallPhoto: {
		type: String,
		required: true,
	},
	profilePhoto: {
		type: String,
		required: true,
	},
});

const LoginCredential = model("loginCredential", LoginCredentialSchema);

module.exports = LoginCredential;
