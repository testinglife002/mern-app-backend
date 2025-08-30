import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get('/', auth, getLoggedInUser);

export default router;
