// server/src/routes/supplier.routes.js

import { Router } from "express";

import {
  createSupplier,
  getSupplier,
  listSuppliers,
  updateSupplier,
  deleteSupplier
} from "../controllers/SupplierController.js";

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
    listSuppliers
  )
  .post(
    authorize("admin"),
    createSupplier
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getSupplier
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateSupplier
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteSupplier
  );

export default router;
