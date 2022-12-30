const { Router } = require("express");
const Users = require("../../models/Users");

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) throw new Error("No user");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Users.findByIdAndUpdate(id, req.body);
    if (!response) throw Error("Something went wrong updating the user");
    const updated = { ...response._doc, ...req.body };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/friends", async (req, res) => {
  const userId = req.params.id;
  const friend = req.body.friend;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/friends", async (req, res) => {
  const userId = req.params.id;
  const friend = req.body.friend;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends.push(friend);

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Users.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong deleting the user");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
