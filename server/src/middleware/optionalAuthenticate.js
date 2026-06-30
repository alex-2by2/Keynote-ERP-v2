// server/src/middleware/optionalAuthenticate.js

import { verifyAccessToken } from "../utils/jwt.js";

export default function optionalAuthenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  try {
    const token = authorization.substring(7);

    req.user = verifyAccessToken(token);
  } catch {
    req.user = null;
  }

  next();
}
