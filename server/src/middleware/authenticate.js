import AppError from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export default function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(
      new AppError("Authentication required.", 401, "UNAUTHORIZED")
    );
  }

  try {
    const token = header.substring(7);

    req.user = verifyAccessToken(token);

    next();
  } catch {
    next(
      new AppError("Invalid or expired token.", 401, "INVALID_TOKEN")
    );
  }
}
