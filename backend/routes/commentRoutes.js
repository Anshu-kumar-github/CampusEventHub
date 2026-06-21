const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addComment,
    getCommentsByEvent,
    deleteComment
} = require("../controllers/commentController");

router.post(
  "/",
  protect,
  addComment
);

router.get(
  "/event/:eventId",
  getCommentsByEvent
);

router.delete(
  "/:id",
  protect,
  deleteComment
);

module.exports = router;