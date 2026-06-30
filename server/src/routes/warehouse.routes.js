// server/src/routes/warehouse.routes.js

import { Router } from "express";

import {
  createWarehouse,
  getWarehouse,
  listWarehouses,
  updateWarehouse,
  deleteWarehouse
} from "../controllers/WarehouseController.js";

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
    listWarehouses
  )
  .post(
    authorize("admin"),
    createWarehouse
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getWarehouse
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateWarehouse
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteWarehouse
  );

export default router;
