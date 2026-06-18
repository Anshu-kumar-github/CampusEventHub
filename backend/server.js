const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
require("dotenv").config();

// Database connection
const db = require("./config/db");

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected Successfully");

    // db.query("SELECT 1 + 1 AS result", (err, results) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(results);
    //   }
    // });
  }
});

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CampusEventHub Backend Running");
});

app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

// app.post("/api/auth/register", (req, res) => {
//   res.json({
//     success: true,
//     message: "Registration Working"
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});