const { Schema, model } = require("mongoose");

const LoginCredentialSchema = new Schema({
	email_Address: {
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
	wall_Photo: {
		type: String,
		required: false,
	},
	profile_Photo: {
		type: String,
		required: false,
	},
	friends: {
		type: Array,
		required: true,
	},
});

const LoginCredential = model("loginCredential", LoginCredentialSchema);

module.exports = LoginCredential;
