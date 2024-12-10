import express from "express";
import {
  addArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "./controller.js";
import { authorize } from "../../middlewares/auth.js";
const router = express.Router();

router.get("/", authorize(["user"]), getArtists);
router.get("/:id", authorize(["user"]), getArtist);
router.delete("/:id", authorize(["editor"]), deleteArtist);
router.post("/add-artist", authorize(["editor"]), addArtist);
router.put("/update-artist", authorize(["editor"]), updateArtist);
export default router;