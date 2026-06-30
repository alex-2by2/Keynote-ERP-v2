// server/src/routes/auth.routes.js

import { Router } from "express";

import {
  login,
  refresh,
  logout
} from "../controllers/AuthController.js";

import authenticate from "../middleware/authenticate.js";

const router = Router();

router.post("/login", login);

router.post("/refresh", refresh);

router.post(
  "/logout",
  authenticate,
  logout
);

export default router;
