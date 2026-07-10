// server/src/routes/userRole.routes.js

import { Router } from "express";

import {
  assignUserRole,
  listUserRoles
} from "../controllers/UserRoleController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);
router.use(authorize("admin"));

router
  .route("/")
  .get(listUserRoles)
  .post(assignUserRole);

export default router;
