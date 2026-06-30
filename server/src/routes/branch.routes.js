// server/src/routes/branch.routes.js

import { Router } from "express";

import {
  createBranch,
  getBranch,
  listBranches,
  updateBranch,
  deleteBranch
} from "../controllers/BranchController.js";

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
    listBranches
  )
  .post(
    authorize("admin"),
    createBranch
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getBranch
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateBranch
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteBranch
  );

export default router;
