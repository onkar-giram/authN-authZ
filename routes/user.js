const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for TESTS",
  });
});

//Protected Route
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for admins",
  });
});

module.exports = router;
