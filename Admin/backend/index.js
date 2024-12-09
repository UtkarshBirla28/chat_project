import express from "express";
import dotenv from "dotenv";
import createProxyMiddleware from "http-proxy-middleware";
import adminRoute from "./routes/auth.js";
import cors from "cors";
import { protectRoute } from "./middleware/protectAdminRoute.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// app.use(
//   "/api/chat",
//   validateAdmin, // Ensure request is validated
//   createProxyMiddleware({
//     target: process.env.CHAT_APP_URL,
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api/chat": "/", // Strip `/api/chat` when forwarding
//     },
//   })
// );

app.use("/", adminRoute);
app.get("/all", protectRoute, (req, res) => {
  res.status(200).json({
    data: "ok",
  });
});

app.listen(8003, () => {
  console.log("Server started at port 8003");
});
