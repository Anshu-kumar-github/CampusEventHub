const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  submitFeedback,
    getEventFeedback,
    getFeedbackAnalytics
} = require("../controllers/feedbackController");

router.post(
  "/",
  protect,
  submitFeedback
);

router.get(
  "/event/:eventId",
  getEventFeedback
);

router.get(
  "/analytics/:eventId",
  protect,
  authorize("college_admin", "super_admin"),
  getFeedbackAnalytics
);

module.exports = router;