// server/src/routes/stockTransfer.routes.js

import { Router } from "express";

import {
  createStockTransfer,
  getStockTransfer,
  listStockTransfers,
  updateStockTransfer,
  deleteStockTransfer
} from "../controllers/StockTransferController.js";

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
    listStockTransfers
  )
  .post(
    authorize("admin", "manager"),
    createStockTransfer
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getStockTransfer
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateStockTransfer
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteStockTransfer
  );

export default router;
