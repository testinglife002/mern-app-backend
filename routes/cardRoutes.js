// /routes/cardRoutes.js
import express from "express";
import { createCard, moveCard } from "../controllers/cardController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createCard);
router.put("/move", auth, moveCard);

export default router;


