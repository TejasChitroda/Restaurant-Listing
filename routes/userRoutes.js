const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes

//getuser
router.get("/getuser", authMiddleware, getUserController);

//update user
router.put("/updateuser", authMiddleware, updateUserController);

//update password
router.post("/updatepass", authMiddleware, updatePasswordController);

// reset Password
router.post("/resetpass", authMiddleware, resetPasswordController);

// delete profile
router.delete("/delete/:id", authMiddleware, deleteProfileController);

module.exports = router;
