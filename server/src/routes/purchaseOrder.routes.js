// server/src/routes/purchaseOrder.routes.js

import { Router } from "express";

import {
  createPurchaseOrder,
  getPurchaseOrder,
  listPurchaseOrders,
  updatePurchaseOrder,
  deletePurchaseOrder
} from "../controllers/PurchaseOrderController.js";

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
    listPurchaseOrders
  )
  .post(
    authorize("admin", "manager"),
    createPurchaseOrder
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getPurchaseOrder
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updatePurchaseOrder
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deletePurchaseOrder
  );

export default router;
