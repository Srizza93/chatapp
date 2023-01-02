const { Router } = require("express");
const Users = require("../../models/Users");

const router = Router();

router.get("/:id/friends", async (req, res) => {
  const userId = req.params.id;

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

module.exports = router;
