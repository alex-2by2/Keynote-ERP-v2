import { logError } from "../utils/logger.js";

export default function errorHandler(err, req, res, next) {
  logError(err.message, {
    requestId: req.requestId,
    stack: err.stack
  });

  res.status(err.status || 500).json({
    success: false,
    requestId: req.requestId,
    message: err.message || "Internal Server Error"
  });
}
