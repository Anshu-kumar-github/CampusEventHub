const express = require("express");

const router = express.Router();

const {
  getAdminDashboard
} = require("../controllers/dashboardController");

const protect =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

// Admin Dashboard
router.get(
  "/admin",
  protect,
  authorize("college_admin", "super_admin"),
  getAdminDashboard
);

module.exports = router;