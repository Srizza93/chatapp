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
});

const LoginCredential = model("loginCredential", LoginCredentialSchema);

module.exports = LoginCredential;
