const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

router.get("/",getAllEvents);
router.get("/:id",getEventById);

router.post(
    "/",
    protect,
    authorize("college_admin", "super_admin"),
    createEvent
);

router.put(
  "/:id",
  protect,
  authorize("college_admin", "super_admin"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorize("college_admin", "super_admin"),
  deleteEvent
);

module.exports = router;