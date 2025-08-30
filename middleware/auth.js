// /middleware/auth.js
// middleware/auth.js
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// middleware/auth.js

// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user || decoded;
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;



