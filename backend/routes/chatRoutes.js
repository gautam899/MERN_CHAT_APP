import express from "express";

import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controllers/chatControllers.js";
// We will create route to the chat but only logged in user should be able to access this route.
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
//so we will add protected here in this case.
router.route("/").post(protect, accessChat);
// Now we need an api to fetch the user chats.
router.route("/").get(protect, fetchChats);

// Now we need some routes for the groups. Like create a group chat, rename a group chat, remove, add etc.
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);
export default router;
