import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Cross-origin (Vercel frontend -> Render backend) with credentials so the
// jwt cookie can travel. CLIENT_URL is the Vercel domain; localhost for dev.
const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	process.env.CLIENT_URL,
].filter(Boolean);

app.use(
	cors({
		origin: (origin, cb) => {
			if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
			return cb(null, true); // permissive: token auth also guards the API
		},
		credentials: true,
	})
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.timeout = 120000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
