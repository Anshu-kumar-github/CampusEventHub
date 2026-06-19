// const db = require("../config/db");
// const registerForEvent = async (req, res) => {

//   console.log(req.body);

//   return res.status(200).json({
//     success: true,
//     message: "Registration API Working"
//   });

// };

// module.exports = {
//   registerForEvent
// };

const db = require("../config/db");

const registerForEvent = (req, res) => {

  const { event_id } = req.body;

  const user_id = req.user.id;
  const role = req.user.role;

  // Only students can register
  if (role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Only students can register for events"
    });
  }

  // Validate event ID
  if (!event_id) {
    return res.status(400).json({
      success: false,
      message: "Event ID is required"
    });
  }

  // Check event exists
  db.query(
    "SELECT * FROM events WHERE id = ?",
    [event_id],
    (err, eventResult) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (eventResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Event not found"
        });
      }

      const event = eventResult[0];

      // Check duplicate registration
      db.query(
        `
        SELECT * FROM registrations
        WHERE event_id = ?
        AND user_id = ?
        `,
        [event_id, user_id],
        (err, existingRegistration) => {

          if (existingRegistration.length > 0) {
            return res.status(400).json({
              success: false,
              message: "Already registered for this event"
            });
          }

          // Check slot availability
          db.query(
            `
            SELECT COUNT(*) AS total
            FROM registrations
            WHERE event_id = ?
            `,
            [event_id],
            (err, countResult) => {

              const currentCount = countResult[0].total;

              if (currentCount >= event.max_participants) {
                return res.status(400).json({
                  success: false,
                  message: "Event is full"
                });
              }

              // Insert registration
              db.query(
                `
                INSERT INTO registrations
                (
                  event_id,
                  user_id,
                  status
                )
                VALUES (?, ?, ?)
                `,
                [
                  event_id,
                  user_id,
                  "pending"
                ],
                (err, result) => {

                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message: "Registration failed"
                    });
                  }

                  return res.status(201).json({
                    success: true,
                    message: "Registration submitted successfully",
                    registrationId: result.insertId
                  });

                }
              );

            }
          );

        }
      );

    }
  );

};

const getMyRegistrations = (req, res) => {

  const user_id = req.user.id;

  db.query(
    `
    SELECT
      r.id,
      r.status,
      r.timestamp,
      e.title,
      e.category,
      e.location,
      e.start_date,
      e.end_date
    FROM registrations r
    JOIN events e
      ON r.event_id = e.id
    WHERE r.user_id = ?
    ORDER BY r.timestamp DESC
    `,
    [user_id],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch registrations"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        registrations: results
      });

    }
  );

};

module.exports = {
  registerForEvent,
    getMyRegistrations
};