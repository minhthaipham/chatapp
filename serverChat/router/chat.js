import express from "express";
import {
  accessChat,
  addMember,
  createGroupChat,
  listChatOfUser,
  removeMember,
  reNameGroup,
  getUser,
  getChat,
} from "../controller/chat.js";
import { auth } from "../middleware/protect.js";
const router = express.Router();
router.post("/create", auth, createGroupChat);
router.put("/rename", auth, reNameGroup);
router.put("/add", auth, addMember);
router.put("/remove", auth, removeMember);
// router.post("/", auth, accessChat);
router.post("/", accessChat);
router.get("/", auth, listChatOfUser);
router.get("/getChat", auth, getChat);
router.get("/user", auth, getUser);
export default router;
