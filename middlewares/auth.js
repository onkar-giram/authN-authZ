//auth, isAdmin, isStudent
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    //extract JWT token
    const token = req.body.token;

    if (!token) {
      return res.json({
        success: false,
        message: "TOKEN MISSING ",
      });
    }

    //verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SEC);
      req.user = payload;
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "TOKEN IS INVALID",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "SOMETHING WENT WRONG WHILE VERIFYING THE USER",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.json({
        success: false,
        message: "This is a proctected route for student",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: " User role is not matching ",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.json({
        success: false,
        message: "This is a proctected route for admin",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: " User role is not matching ",
    });
  }
};
