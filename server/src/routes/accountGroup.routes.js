// server/src/routes/accountGroup.routes.js

import { Router } from "express";

import {
  createAccountGroup,
  getAccountGroup,
  listAccountGroups,
  updateAccountGroup,
  deleteAccountGroup
} from "../controllers/AccountGroupController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);

router
  .route("/")
  .get(
    authorize("admin", "manager"),
    listAccountGroups
  )
  .post(
    authorize("admin"),
    createAccountGroup
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getAccountGroup
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateAccountGroup
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteAccountGroup
  );

export default router;
