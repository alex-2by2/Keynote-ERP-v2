// server/src/middleware/currentUser.js

import AppError from "../utils/AppError.js";
import UserService from "../services/UserService.js";
import asyncHandler from "../utils/asyncHandler.js";

export default asyncHandler(async (req, res, next) => {
  if (!req.user?.sub) {
    throw new AppError(
      "Authentication required.",
      401,
      "UNAUTHORIZED"
    );
  }

  const user = await UserService.getById(req.user.sub);

  if (!user || !user.isActive) {
    throw new AppError(
      "User account is unavailable.",
      401,
      "USER_UNAVAILABLE"
    );
  }

  req.currentUser = user;

  next();
});
