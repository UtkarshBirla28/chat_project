import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const secretkey = process.env.ADMIN_JWT_SECRET;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token." });
  }
};
