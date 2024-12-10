import express from "express";
import { logout, signIn, signUp } from "./controller.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logout);
export default router;
