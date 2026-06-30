// server/src/controllers/AuthController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import AuthService from "../services/AuthService.js";
import { validateLogin } from "../validators/auth.validator.js";

export const login = asyncHandler(async (req, res) => {
  const credentials = validateLogin(req.body);

  const result = await AuthService.login(
    credentials.email,
    credentials.password
  );

  return success(
    res,
    result,
    "Login successful."
  );
});
