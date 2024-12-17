import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, updateProfile } from "../controllers/user.controller.js";
import fileUpload from "express-fileupload";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.patch("/update", protectRoute, fileUpload({ useTempFiles: true }), updateProfile);


export default router;
