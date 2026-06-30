// server/src/routes/costCenter.routes.js

import { Router } from "express";

import {
  createCostCenter,
  getCostCenter,
  listCostCenters,
  updateCostCenter,
  deleteCostCenter
} from "../controllers/CostCenterController.js";

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
    listCostCenters
  )
  .post(
    authorize("admin"),
    createCostCenter
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getCostCenter
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateCostCenter
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteCostCenter
  );

export default router;
