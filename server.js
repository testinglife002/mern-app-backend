require('dotenv').config(); // Load environment variables first
const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes"); // Example route
// const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

connectDB(); // Connect to MongoDB

const app = express();


// Middleware
const cors = require('cors');

app.use(cors({
  origin: 'https://mern-app-frontend-orcin.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // enable pre-flight across-the-board

/*
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',  // ✅ Vite dev server
  'https://mern-app-frontend-orcin.vercel.app',
  'https://968ccaaff526.ngrok-free.app',
  'https://48e41932009d.ngrok-free.app',
];

// Enable CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
*/

// Body parser for JSON data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/*
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
*/

// Routes
app.use("/api/auth", authRoutes); // Example auth routes

// Basic route for testing
app.get('/', (req, res) => {
  res.send('MERN Backend is Live! API is running...');
});

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: err.message });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


