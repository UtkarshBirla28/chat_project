import jwt from "jsonwebtoken";
import prisma, { publicUser } from "../db/prisma.js";

const protectRoute = async (req, res, next) => {
	try {
		// Accept the token from the Authorization header (primary, works
		// cross-domain) or the httpOnly cookie (fallback).
		const authHeader = req.headers.authorization;
		const bearer = authHeader?.startsWith("Bearer ")
			? authHeader.slice(7)
			: null;
		const token = bearer || req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = publicUser(user);
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(401).json({ error: "Unauthorized - Invalid Token" });
	}
};

export default protectRoute;
