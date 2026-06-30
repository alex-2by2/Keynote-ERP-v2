// server/src/middleware/authorize.js

import AppError from "../utils/AppError.js";

export default function authorize(...allowedRoles) {
  const roles = new Set(allowedRoles);

  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(
          "Authentication required.",
          401,
          "UNAUTHORIZED"
        )
      );
    }

    if (!roles.has(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action.",
          403,
          "FORBIDDEN"
        )
      );
    }

    next();
  };
}
