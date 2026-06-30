// server/src/routes/purchaseReturn.routes.js

import { Router } from "express";

import {
  createPurchaseReturn,
  getPurchaseReturn,
  listPurchaseReturns,
  updatePurchaseReturn,
  deletePurchaseReturn
} from "../controllers/PurchaseReturnController.js";

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
    listPurchaseReturns
  )
  .post(
    authorize("admin", "manager"),
    createPurchaseReturn
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getPurchaseReturn
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updatePurchaseReturn
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deletePurchaseReturn
  );

export default router;
