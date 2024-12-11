import { generateToken } from "../utils/jwtTokensGenerate.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send("Fields are empty");
  }

  const checkExistingUser = await prisma.Admin.findFirst({
    where: {
      username,
      password,
    },
  });

  if (!checkExistingUser) {
    res.status(401).send("User not found");
    return;
  }

  const sendToken = generateToken(checkExistingUser.username);

  res.json({
    token: sendToken,
  });
};
