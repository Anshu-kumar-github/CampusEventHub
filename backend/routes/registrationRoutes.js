const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerForEvent,
  getMyRegistrations
} = require("../controllers/registrationController");

// router.post(
//   "/",
//   protect,
//   registerForEvent
// );

// router.get(
//   "/my-registrations",
//   protect,
// );

router.post(
  "/",
  protect,
  registerForEvent
);

router.get(
  "/my",
  protect,
  getMyRegistrations
);

module.exports = router;