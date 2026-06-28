const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  registerUser,
  loginUser,
    getCurrentUser
} = require("../controllers/authController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get(
  "/admin-test",
  protect,
  authorize("college_admin"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin"
    });

  }
);
module.exports = router;