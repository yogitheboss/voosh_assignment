import express from "express";
const router = express.Router();
import {
  addAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from "./controller.js";
import { authorize } from "../../middlewares/auth.js";

router.get("/", authorize(["user"]), getAlbums);
router.get("/:id", authorize(["user"]), getAlbum);
router.put("/:id", authorize(["editor"]), updateAlbum);
router.delete("/:id", authorize(["editor"]), deleteAlbum);
router.post("/add-album", authorize(["editor"]), addAlbum);
export default router;
