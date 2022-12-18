const { Router } = require("express");
const Users = require("../../models/Users");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const users = await Users.find();
		if (!users) throw new Error("No users");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	const newUsers = new Users(req.body);
	try {
		const users = await newUsers.save();
		if (!users) throw new Error("Something went wrong saving the users");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
