import jwt from "jsonwebtoken";

export const generateToken = (userName) => {
  const token = jwt.sign(userName, process.env.ADMIN_JWT_SECRET);

  return token;
};
