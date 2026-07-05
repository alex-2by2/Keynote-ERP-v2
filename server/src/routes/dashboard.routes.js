// server/src/routes/dashboard.routes.js

import { Router } from "express";

import { getDashboardStats } from "../controllers/DashboardController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);

router.get(
  "/stats",
  authorize("admin", "manager", "employee"),
  getDashboardStats
);

export default router;
