// server/src/middleware/ownerOrRole.js

import AppError from "../utils/AppError.js";

export default function ownerOrRole(...roles) {
  const allowedRoles = new Set(roles);

  return (req, res, next) => {
    if (!req.currentUser) {
      return next(
        new AppError(
          "Authentication required.",
          401,
          "UNAUTHORIZED"
        )
      );
    }

    if (allowedRoles.has(req.currentUser.role)) {
      return next();
    }

    const resourceId = String(req.params.id || "");

    if (resourceId && resourceId === String(req.currentUser.id)) {
      return next();
    }

    return next(
      new AppError(
        "You do not have permission to access this resource.",
        403,
        "FORBIDDEN"
      )
    );
  };
}
