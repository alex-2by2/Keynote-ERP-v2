import crypto from "node:crypto";

const ITERATIONS = 120000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, originalHash] = storedHash.split(":");

  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(originalHash)
  );
}
