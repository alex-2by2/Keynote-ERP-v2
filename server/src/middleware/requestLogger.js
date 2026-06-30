// server/src/middleware/requestLogger.js

import crypto from "crypto";

export default function requestLogger(
  req,
  res,
  next
) {
  const requestId = crypto.randomUUID();

  const startedAt = Date.now();

  req.requestId = requestId;

  res.setHeader(
    "X-Request-Id",
    requestId
  );

  res.on("finish", () => {
    const duration =
      Date.now() - startedAt;

    const log = {
      requestId,

      method: req.method,

      url: req.originalUrl,

      statusCode: res.statusCode,

      duration: `${duration}ms`,

      ip:
        req.ip ||
        req.headers["x-forwarded-for"],

      userAgent:
        req.get("user-agent"),

      userId:
        req.user?.id || null,

      timestamp:
        new Date().toISOString()
    };

    if (process.env.NODE_ENV !== "test") {
      console.log(
        JSON.stringify(log)
      );
    }
  });

  next();
}
