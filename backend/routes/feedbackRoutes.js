const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  submitFeedback,
    getEventFeedback
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

module.exports = router;