import getUserMessages from "../controllers/Admin/message.controller.js";
import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserMessages);

export default router;
