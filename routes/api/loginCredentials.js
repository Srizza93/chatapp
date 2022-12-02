const { Router } = require("express");
const LoginCredential = require("../../models/LoginCredential");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const loginCredentials = await LoginCredential.find();
		if (!loginCredentials) throw new Error("No loginCredentials");
		const sorted = loginCredentials.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
		res.status(200).json(sorted);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	const newLoginCredential = new LoginCredential(req.body);
	try {
		const loginCredential = await newLoginCredential.save();
		if (!loginCredential)
			throw new Error("Something went wrong saving the bucketListItem");
		res.status(200).json(loginCredential);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const response = await LoginCredential.findByIdAndUpdate(id, req.body);
		if (!response) throw Error("Something went wrong ");
		const updated = { ...response._doc, ...req.body };
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const removed = await LoginCredential.findByIdAndDelete(id);
		if (!removed) throw Error("Something went wrong ");
		res.status(200).json(removed);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
