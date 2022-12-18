const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
	users: [
		{
			type: String,
			required: true,
		},
	],
	messages: [
		{
			sender: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

const Chat = model("chat", ChatSchema);

module.exports = Chat;
