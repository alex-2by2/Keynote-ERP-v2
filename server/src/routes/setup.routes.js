import { Router } from "express";

import {
  getSetupStatus,
  initializeSetup
} from "../controllers/SetupController.js";

const router = Router();

router.get(
  "/status",
  getSetupStatus
);

router.post(
  "/initialize",
  initializeSetup
);

export default router;
