// server/src/routes/receipt.routes.js

import { Router } from "express";

import {
  createReceipt,
  getReceipt,
  listReceipts,
  updateReceipt,
  deleteReceipt
} from "../controllers/ReceiptController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
  createReceiptValidator,
  updateReceiptValidator
} from "../validators/receipt.validator.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);

router
  .route("/")
  .get(
    authorize(
      "admin",
      "manager",
      "accountant"
    ),
    listReceipts
  )
  .post(
    authorize(
      "admin",
      "manager",
      "accountant"
    ),
    createReceiptValidator,
    createReceipt
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant"
    ),
    getReceipt
  )
  .put(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant"
    ),
    updateReceiptValidator,
    updateReceipt
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteReceipt
  );

export default router;
