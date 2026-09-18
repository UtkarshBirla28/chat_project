import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

/**
 * Signs a JWT, sets it as an httpOnly cookie, and returns the token so the
 * controller can ALSO send it in the response body. The frontend stores that
 * token and sends it as `Authorization: Bearer`, which keeps auth working even
 * when a browser blocks third-party cookies across the Vercel/Render domains.
 */
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
		httpOnly: true,
		// Cross-site (Vercel -> Render) requires SameSite=None + Secure in prod.
		sameSite: isProd ? "none" : "lax",
		secure: isProd,
	});

	return token;
};

export default generateTokenAndSetCookie;
