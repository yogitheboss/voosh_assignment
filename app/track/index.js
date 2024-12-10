import express from "express";
import {
  addTrack,
  deleteTrack,
  getTrack,
  getTracks,
  updateTrack,
} from "./controller.js";
import { authorize } from "../../middlewares/auth.js";
const router = express.Router();

router.get("/", authorize(["user"]), getTracks);
router.get("/:id", authorize(["user"]), getTrack);
router.put("/:id", authorize(["editor"]), updateTrack);
router.delete("/:id", authorize(["editor"]), deleteTrack);
router.post("/add-track", authorize(["editor"]), addTrack);

export default router;
