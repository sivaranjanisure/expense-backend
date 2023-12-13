const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signup = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  try {
    const userExit = await User.findOne({ email });

    if (userExit) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({ message: "User signup successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "5h" });
    const response = {
      token,
      name: user.username,
      message: "Login successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not available" });
    }

    user.password = password;
    user.save();

    const response = {
      message: "Password updated successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, signup, forgotPassword };
