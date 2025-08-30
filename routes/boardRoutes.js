// /routes/boardRoutes.js
import express from "express";
import { getBoards, getBoardById, createBoard } from "../controllers/boardController.js";
import auth from "../middleware/auth.js";
// import protect from "../middleware/protect.js"; // if you plan to use it later

const router = express.Router();

router.get("/", auth, getBoards);
router.post("/", auth, createBoard);
router.get("/:id", auth, getBoardById);

export default router;


