const { Router } = require("express");
const Chat = require("../../models/Chat");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const chat = await Chat.findById(req.params.id);
		if (!chat) throw new Error("No chat");
		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const chat = await Chat.findById(req.params.id);
		if (!chat) throw new Error("No chat");
		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	const newChat = new Chat(req.body);
	try {
		const chat = await newChat.save();
		if (!chat) throw new Error("Something went wrong saving the chat");
		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const removed = await Chat.findByIdAndDelete(id);
		if (!removed) throw Error("Something went wrong deleting the chat");
		res.status(200).json(removed);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
