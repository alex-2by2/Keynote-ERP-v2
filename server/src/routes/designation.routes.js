// server/src/routes/designation.routes.js

import { Router } from "express";

import {
  createDesignation,
  getDesignation,
  listDesignations,
  updateDesignation,
  deleteDesignation
} from "../controllers/DesignationController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);

router
  .route("/")
  .get(authorize("admin", "manager"), listDesignations)
  .post(authorize("admin"), createDesignation);

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getDesignation
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateDesignation
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteDesignation
  );

export default router;
