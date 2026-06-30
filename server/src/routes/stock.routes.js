// server/src/routes/stock.routes.js

import { Router } from "express";

import {
  createStock,
  getStock,
  listStocks,
  updateStock,
  deleteStock
} from "../controllers/StockController.js";

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
    listStocks
  )
  .post(
    authorize("admin", "manager"),
    createStock
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getStock
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateStock
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteStock
  );

export default router;
