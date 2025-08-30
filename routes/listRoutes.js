// /routes/listRoutes.js
import express from "express";
import { createList, updateList } from "../controllers/listController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createList);
router.put("/:id", auth, updateList); // ✅ changed from `get` to `put`

export default router;



