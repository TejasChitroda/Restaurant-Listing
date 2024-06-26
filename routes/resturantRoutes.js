const express = require("express");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//create routes
router.post("/create", authMiddleware, createResturantController);

//get all
router.get("/getAll", authMiddleware, getAllResturantController);

//getById
router.get("/getById/:id", authMiddleware, getResturantByIdController);

//delete
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
