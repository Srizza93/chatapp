const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
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
	friends: [
		{
			type: String,
			required: false,
		},
	],
	chat: [
		{
			type: Object,
			required: false,
		},
	],
});

const Users = model("users", UsersSchema);

module.exports = Users;
