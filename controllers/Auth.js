const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error while hashing password: ${err}`,
      });
    }

    //create entry for user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error while signing up: ${err}`,
    });
  }
};

exports.login = async (req, res) => {};
