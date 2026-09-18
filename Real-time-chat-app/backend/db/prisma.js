import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * The frontend was written against MongoDB documents, so it reads `_id`.
 * These helpers keep the API response shape identical after the move to
 * Postgres by exposing `_id` (and stripping the password).
 */
export function publicUser(user) {
  if (!user) return user;
  const { password, ...rest } = user;
  return { ...rest, _id: user.id };
}

export function publicMessage(message) {
  if (!message) return message;
  return { ...message, _id: message.id };
}

export default prisma;
