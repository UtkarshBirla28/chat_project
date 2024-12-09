import express from "express";
import { Router } from "express";
import { login } from "../controllers/authController.js";

const router = Router();

router.post("/admin", login);

export default router;
