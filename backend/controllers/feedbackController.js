const db = require("../config/db");

const submitFeedback = (req, res) => {

  const { event_id, rating, comments } = req.body;

  const user_id = req.user.id;

  if (!event_id || !rating) {
    return res.status(400).json({
      success: false,
      message: "Event ID and rating are required"
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5"
    });
  }

  db.query(
    `
    INSERT INTO feedback
    (
      event_id,
      user_id,
      rating,
      comments
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      event_id,
      user_id,
      rating,
      comments || null
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to submit feedback"
        });
      }

      return res.status(201).json({
        success: true,
        message: "Feedback submitted successfully"
      });

    }
  );

};

const getEventFeedback = (req, res) => {

  const { eventId } = req.params;

  db.query(
    `
    SELECT
      f.rating,
      f.comments,
      f.timestamp,
      u.name
    FROM feedback f
    JOIN users u
      ON f.user_id = u.id
    WHERE f.event_id = ?
    ORDER BY f.timestamp DESC
    `,
    [eventId],
    (err, results) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Failed to fetch feedback"
        });

      }

      return res.status(200).json({
        success: true,
        count: results.length,
        feedback: results
      });

    }
  );

};

module.exports = {
  submitFeedback,
  getEventFeedback
};