import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

export default function validateObjectId(paramName = "id") {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return next(
        new AppError("Invalid resource identifier.", 400, "INVALID_OBJECT_ID")
      );
    }

    next();
  };
}
