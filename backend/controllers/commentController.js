const db = require("../config/db");

const addComment = (req, res) => {

  const { event_id, comment } = req.body;

  const user_id = req.user.id;

  if (!event_id || !comment) {
    return res.status(400).json({
      success: false,
      message: "Event ID and comment are required"
    });
  }

  db.query(
    `
    INSERT INTO comments
    (
      event_id,
      user_id,
      comment
    )
    VALUES (?, ?, ?)
    `,
    [
      event_id,
      user_id,
      comment
    ],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Failed to add comment"
        });

      }

      return res.status(201).json({
        success: true,
        message: "Comment added successfully"
      });

    }
  );

};

const getCommentsByEvent = (req, res) => {

  const { eventId } = req.params;

  db.query(
    `
    SELECT
      c.id,
      c.comment,
      c.created_at,
      u.name
    FROM comments c
    JOIN users u
      ON c.user_id = u.id
    WHERE c.event_id = ?
    ORDER BY c.created_at DESC
    `,
    [eventId],
    (err, results) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Failed to fetch comments"
        });

      }

      return res.status(200).json({
        success: true,
        count: results.length,
        comments: results
      });

    }
  );

};

const deleteComment = (req, res) => {

  const { id } = req.params;

  db.query(
    "SELECT * FROM comments WHERE id = ?",
    [id],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Comment not found"
        });
      }

      const comment = results[0];

      // Check ownership
      if (comment.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized"
        });
      }

      db.query(
        "DELETE FROM comments WHERE id = ?",
        [id],
        (err) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to delete comment"
            });
          }

          return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
          });

        }
      );

    }
  );

};

module.exports = {
  addComment,
    getCommentsByEvent,
    deleteComment
};