const db = require("../config/db");

const getAdminDashboard = async (req, res) => {

  try {

    // Total Events
    const [events] = await db.promise().query(`
      SELECT COUNT(*) AS totalEvents
      FROM events
    `);

    // Total Participants
    const [participants] = await db.promise().query(`
      SELECT COUNT(*) AS participants
      FROM registrations
    `);

    // Pending Approvals
    const [pending] = await db.promise().query(`
      SELECT COUNT(*) AS pendingApprovals
      FROM registrations
      WHERE status = 'pending'
    `);

    // Average Rating
    const [rating] = await db.promise().query(`
      SELECT ROUND(AVG(rating), 1) AS averageRating
      FROM feedback
    `);

    // Recent Events
    const [recentEvents] = await db.promise().query(`
      SELECT
        id,
        title,
        category,
        location,
        start_date
      FROM events
      ORDER BY id DESC
      LIMIT 5
    `);

    return res.status(200).json({

      success: true,

      dashboard: {

        totalEvents:
          events[0].totalEvents,

        participants:
          participants[0].participants,

        pendingApprovals:
          pending[0].pendingApprovals,

        averageRating:
          rating[0].averageRating || 0,

        recentEvents

      }

    });

  } catch (error) {

  console.error("Dashboard Error:", error);

  return res.status(500).json({
    success: false,
    message: "Failed to load dashboard.",
    error: error.message
  });

}

};

module.exports = {
  getAdminDashboard
};