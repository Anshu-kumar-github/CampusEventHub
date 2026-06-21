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

const getFeedbackAnalytics = (req, res) => {

  const { eventId } = req.params;

  const analyticsQuery = `
    SELECT
      ROUND(AVG(rating), 1) AS averageRating,
      COUNT(*) AS totalFeedback
    FROM feedback
    WHERE event_id = ?
  `;

  db.query(
    analyticsQuery,
    [eventId],
    (err, analyticsResult) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch analytics"
        });
      }

      const distributionQuery = `
        SELECT
          rating,
          COUNT(*) AS count
        FROM feedback
        WHERE event_id = ?
        GROUP BY rating
        ORDER BY rating DESC
      `;

      db.query(
        distributionQuery,
        [eventId],
        (err, distributionResult) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to fetch rating distribution"
            });
          }

          const ratingDistribution = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0
          };

          distributionResult.forEach(item => {
            ratingDistribution[item.rating] = item.count;
          });

          return res.status(200).json({
            success: true,
            analytics: {
              averageRating:
                analyticsResult[0].averageRating || 0,

              totalFeedback:
                analyticsResult[0].totalFeedback || 0,

              ratingDistribution
            }
          });

        }
      );

    }
  );

};

module.exports = {
  submitFeedback,
  getEventFeedback,
  getFeedbackAnalytics
};