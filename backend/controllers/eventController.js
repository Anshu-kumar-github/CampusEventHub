const db = require("../config/db");

const createEvent = async (req, res) => {

    const {
        title,
        description,
        category,
        location,
        max_participants,
        start_date,
        end_date
    } = req.body;

    // Validate fields
    if (
        !title ||
        !description ||
        !category ||
        !location ||
        !start_date ||
        !end_date
    ) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided"
        });
    }

    // Validate dates
    if (new Date(start_date) >= new Date(end_date)) {
        return res.status(400).json({
            success: false,
            message: "End date must be after start date"
        });
    }

    // Get admin ID from JWT
    const college_id = req.user.id;

    db.query(
        `INSERT INTO events
        (
            college_id,
            title,
            description,
            category,
            location,
            max_participants,
            start_date,
            end_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            college_id,
            title,
            description,
            category,
            location,
            max_participants || 100,
            start_date,
            end_date
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Event creation failed"
                });
            }

            return res.status(201).json({
                success: true,
                message: "Event created successfully",
                eventId: result.insertId
            });

        }
    );

};

// const getAllEvents = (req, res) => {

//   db.query(
//     `
//     SELECT
//       e.*,
//       u.name AS organizer_name,
//       u.college
//     FROM events e
//     JOIN users u
//       ON e.college_id = u.id
//     ORDER BY e.created_at DESC
//     `,
//     (err, results) => {

//       if (err) {

//         return res.status(500).json({
//           success: false,
//           message: "Failed to fetch events"
//         });

//       }

//       return res.status(200).json({
//         success: true,
//         count: results.length,
//         events: results
//       });

//     }
//   );

// };

const getAllEvents = (req, res) => {

  const { search, category, college } = req.query;

  let query = `
    SELECT
      e.*,
      u.name AS organizer_name,
      u.college
    FROM events e
    JOIN users u
      ON e.college_id = u.id
    WHERE 1=1
  `;

  let values = [];

  // Search by title
  if (search) {
    query += " AND e.title LIKE ?";
    values.push(`%${search}%`);
  }

  // Filter by category
  if (category) {
    query += " AND e.category = ?";
    values.push(category);
  }

  // Filter by college
  if (college) {
    query += " AND u.college = ?";
    values.push(college);
  }

  // Sort newest first
  query += " ORDER BY e.created_at DESC";

  db.query(query, values, (err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch events"
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      events: results
    });

  });

};

const getEventById = (req, res) => {

  const { id } = req.params;

  db.query(
    `
    SELECT
      e.*,
      u.name AS organizer_name,
      u.college
    FROM events e
    JOIN users u
      ON e.college_id = u.id
    WHERE e.id = ?
    `,
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
          message: "Event not found"
        });
      }

      return res.status(200).json({
        success: true,
        event: results[0]
      });

    }
  );

};

const updateEvent = (req, res) => {

  const { id } = req.params;

  db.query(
    "SELECT * FROM events WHERE id = ?",
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
          message: "Event not found"
        });
      }

      const event = results[0];

      if (
        req.user.role !== "super_admin" &&
        event.college_id !== req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own events"
        });
      }

      const {
        title,
        description,
        category,
        location,
        max_participants,
        start_date,
        end_date
      } = req.body;

      db.query(
        `UPDATE events
         SET title=?,
             description=?,
             category=?,
             location=?,
             max_participants=?,
             start_date=?,
             end_date=?
         WHERE id=?`,
        [
          title,
          description,
          category,
          location,
          max_participants,
          start_date,
          end_date,
          id
        ],
        (err) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: "Event update failed"
            });
          }

          return res.status(200).json({
            success: true,
            message: "Event updated successfully"
          });

        }
      );

    }
  );

};

const deleteEvent = (req, res) => {

  const { id } = req.params;

  db.query(
    "SELECT * FROM events WHERE id = ?",
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
          message: "Event not found"
        });
      }

      const event = results[0];

      if (
        req.user.role !== "super_admin" &&
        event.college_id !== req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "You can only delete your own events"
        });
      }

      db.query(
        "DELETE FROM events WHERE id = ?",
        [id],
        (err) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: "Event deletion failed"
            });
          }

          return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
          });

        }
      );

    }
  );

};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};