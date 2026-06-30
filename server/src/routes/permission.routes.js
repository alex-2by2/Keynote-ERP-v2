// server/src/routes/permission.routes.js

import { Router } from "express";

import {
  createPermission,
  getPermission,
  listPermissions,
  updatePermission,
  deletePermission
} from "../controllers/PermissionController.js";

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
  .get(listPermissions)
  .post(createPermission);

router
  .route("/:id")
  .get(validateObjectId(), getPermission)
  .put(validateObjectId(), updatePermission)
  .delete(validateObjectId(), deletePermission);

export default router;
