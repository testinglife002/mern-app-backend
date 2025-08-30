import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://mern-app-frontend-orcin.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // enable pre-flight across-the-board

/*
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // ✅ Vite dev server
  "https://mern-app-frontend-orcin.vercel.app",
  "https://968ccaaff526.ngrok-free.app",
  "https://48e41932009d.ngrok-free.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
*/

// Body parser for JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("MERN Backend is Live! API is running...");
});

// Log request origins
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
