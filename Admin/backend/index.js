import express from "express";
import dotenv from "dotenv";
import httpProxy from "http-proxy";
import adminRoute from "./routes/auth.js";
import cors from "cors";
import { protectRoute } from "./middleware/protectAdminRoute.js";

dotenv.config();

const app = express();
const proxy = httpProxy.createProxyServer();

// Middleware
app.use(cors());
app.use(express.json());

// Proxy setup
app.use("/api", protectRoute, (req, res) => {
  req.url = `/api${req.url}`; // Explicitly prepend '/api'
  proxy.web(req, res, {
    target: process.env.CHAT_APP_URL,
    changeOrigin: true,
    timeout: 5000, // Optional: Add timeout
  });

  proxy.on("error", (err) => {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Proxy failed" });
  });

  proxy.on("proxyReq", (proxyReq, req) => {
    console.debug(`Proxying request: ${req.method} ${req.url}`);
  });
});

// Admin routes
app.use("/", adminRoute);

// Protected route
app.get("/all", protectRoute, (req, res) => {
  res.status(200).json({
    data: "ok",
  });
});

// Start server
app.listen(8003, () => {
  console.log("Server started at port 8003");
});
