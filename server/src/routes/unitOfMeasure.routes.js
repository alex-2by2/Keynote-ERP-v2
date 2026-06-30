// server/src/routes/unitOfMeasure.routes.js

import { Router } from "express";

import {
  createUnitOfMeasure,
  getUnitOfMeasure,
  listUnitOfMeasures,
  updateUnitOfMeasure,
  deleteUnitOfMeasure
} from "../controllers/UnitOfMeasureController.js";

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
    listUnitOfMeasures
  )
  .post(
    authorize("admin"),
    createUnitOfMeasure
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getUnitOfMeasure
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateUnitOfMeasure
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteUnitOfMeasure
  );

export default router;
