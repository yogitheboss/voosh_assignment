import express from "express";
import { getFavorites, addFavorite, deleteFavorite } from "./controller.js";
import { authorize } from "../../middlewares/auth.js";
const router = express.Router();

router.get("/", authorize(["user"]), getFavorites);
router.post("/add-favorite", authorize(["user"]), addFavorite);
router.delete("/:id", authorize(["user"]), deleteFavorite);
export default router;
