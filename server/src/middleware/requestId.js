import crypto from "node:crypto";

export default function requestId(req, res, next) {
  req.requestId = crypto.randomUUID();

  res.setHeader("X-Request-Id", req.requestId);

  next();
}
