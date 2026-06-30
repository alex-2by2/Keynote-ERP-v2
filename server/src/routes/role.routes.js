// server/src/routes/role.routes.js

import { Router } from "express";

import {
  createRole,
  getRole,
  listRoles,
  updateRole,
  deleteRole
} from "../controllers/RoleController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);
router.use(authorize("admin"));

router
  .route("/")
  .get(listRoles)
  .post(createRole);

router
  .route("/:id")
  .get(validateObjectId(), getRole)
  .put(validateObjectId(), updateRole)
  .delete(validateObjectId(), deleteRole);

export default router;
