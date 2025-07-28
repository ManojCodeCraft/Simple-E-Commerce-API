const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAdmin, isUser } = require("../middleware/middleware");
const {
  Register,
  Login,
  getAllUsers,
  getUserById,
  updateUser,
  updatePassword,
  deleteUser,
  getUserCount,
} = require("../controllers/user.controller");

router.post("/register", Register);
router.post("/login", Login);

router.use(isUser);

router.get("/", isAdmin, getAllUsers);
router.get("/:id", isAdmin, getUserById);
router.put("/:id", updateUser);
router.put("/:id/password", isAdmin, updatePassword);
router.delete("/:id", isAdmin, deleteUser);
router.get("/get/count", isAdmin, getUserCount);

module.exports = router;
