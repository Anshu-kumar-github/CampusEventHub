const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {

  console.log(req.body);

  // Get user data
  const { name, email, password, college, role } = req.body;

  console.log(req.body);

  // Basic validation
  if (!name || !email || !password || !college || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  // Check if email already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already registered"
        });
      }

      // Next step: password hashing and insert user

    //   return res.status(200).json({
    //     success: true,
    //     message: "Email available"
    //   });

    // Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Insert user
db.query(
  `INSERT INTO users
   (name, email, password, college, role)
   VALUES (?, ?, ?, ?, ?)`,
  [name, email, hashedPassword, college, role],
  (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "User registration failed"
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  }
);

    }
  );

};



const loginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials"
        });
      }

    //   const user = results[0];

    //   return res.status(200).json({
    //     success: true,
    //     message: "User found",
    //     user
    //   });

    const user = results[0];

// Compare password
const isMatch = await bcrypt.compare(
  password,
  user.password
);

// if (!isMatch) {
//   return res.status(400).json({
//     success: false,
//     message: "Invalid credentials"
//   });
// }

// return res.status(200).json({
//   success: true,
//   message: "Login successful"
// });

if (!isMatch) {
  return res.status(400).json({
    success: false,
    message: "Invalid credentials"
  });
}

// Generate JWT Token
const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d"
  }
);

return res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    college: user.college
  }
});

    }
  );

};

const getCurrentUser = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};

//   res.status(200).json({
//     success: true,
//     message: "Registration API Working"
//   });

// };

module.exports = {
  registerUser,loginUser,getCurrentUser
};