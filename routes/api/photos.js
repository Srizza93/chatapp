const { Router } = require("express");
const Users = require("../../models/Users");
const router = Router();

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.get("/:id/photos/", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/:id/photos/:photo", async (req, res) => {
//   const userId = req.params.id;
//   const photoType = req.params.photo;

//   const user = await Users.findById(userId);
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.send(req);
//   user.photos[photoType] = req.file;

//   user.save();
// });

// function savePhoto(photo) {
//   const filename = `${photo.filename}-${Date.now()}${path.extname(
//     photo.originalname
//   )}`;
//   photo.mv(`public/photos/${filename}`, (error) => {
//     if (error) {
//       throw error;
//     }
//   });
//   return `/photos/${filename}`;
// }

// module.exports = router;
