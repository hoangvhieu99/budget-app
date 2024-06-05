const express = require("express");
const {
  createUser,
  loginUserCtrl,
  deleteaUser,
  updatedUser,
  handleRefreshToken,
  logout,
  updatePassword,
} = require("../controller/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/logout", logout);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/password", authMiddleware, updatePassword);
router.delete("/:id", deleteaUser);
router.get("/refresh", handleRefreshToken);
module.exports = router;
