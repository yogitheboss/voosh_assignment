import express from "express";
import { addUser, deleteUser, getUsers, updatePassword } from "./controller.js";
import { authorize } from "../../middlewares/auth.js";
const router = express.Router();

router.get("/", authorize(["admin"]), getUsers);
router.post("/add-user", authorize(["admin"]), addUser);
router.delete("/:id", authorize(["admin"]), deleteUser);
router.put("/update-password", authorize(["user"]), updatePassword);
export default router;
