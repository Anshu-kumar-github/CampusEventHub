const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  registerForEvent,
  getMyRegistrations,
  getEventParticipants,
    approveRegistration,
    rejectRegistration
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

router.get(
  "/event/:eventId",
  protect,
  authorize("college_admin", "super_admin"),
  getEventParticipants
);

router.put(
  "/:id/approve",
  protect,
  authorize("college_admin", "super_admin"),
  approveRegistration
);

router.put(
  "/:id/reject",
  protect,
  authorize("college_admin", "super_admin"),
  rejectRegistration
);

module.exports = router;