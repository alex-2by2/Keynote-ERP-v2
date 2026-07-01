import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";

import config from "./index.js";

export const helmetMiddleware = helmet({
  crossOriginResourcePolicy: false
});

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowedOrigins = config.cors.origin || [];

    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  credentials: true,
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ]
});

export const compressionMiddleware =
  compression();

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 500,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later."
  }
});
