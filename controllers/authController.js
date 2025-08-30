// src/controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, isAdmin, role, title } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      status: false,
      message: "User already exists",
    });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashed,
      isAdmin,
      role,
      title,
    });
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res
        .status(404)
        .json({ error: "User not found! Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ error: "Invalid credentials! Password does not match." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: true, // ✅ keep true for production (HTTPS)
    });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

exports.getLoggedInUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ user: req.user });
  } catch (err) {
    console.error('Error fetching logged-in user:', err.message);
    res.status(500).send('Server Error');
  }
};
