const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const cookieParser = require("cookie-parser");

const login = express.Router();

login.use(cookieParser());

login.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, "12345", {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    let navigate = "/";

    if (user.role === "customer") {
      navigate = "/";
    } else {
      navigate = "/admin/dashboard";
    }

    res.json({
      message: "Login successful",
      data: {
        token: token,
        role: user.role,
        userId: user._id,
        navigate: navigate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = login;
