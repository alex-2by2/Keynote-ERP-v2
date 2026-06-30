// server/src/routes/inventoryTransaction.routes.js

import { Router } from "express";

import {
  createInventoryTransaction,
  getInventoryTransaction,
  listInventoryTransactions,
  deleteInventoryTransaction
} from "../controllers/InventoryTransactionController.js";

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
    listInventoryTransactions
  )
  .post(
    authorize("admin", "manager"),
    createInventoryTransaction
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getInventoryTransaction
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteInventoryTransaction
  );

export default router;
