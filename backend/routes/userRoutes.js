import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

export default router;
