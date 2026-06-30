// server/src/routes/purchaseInvoice.routes.js

import { Router } from "express";

import {
  createPurchaseInvoice,
  getPurchaseInvoice,
  listPurchaseInvoices,
  updatePurchaseInvoice,
  deletePurchaseInvoice
} from "../controllers/PurchaseInvoiceController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
  createPurchaseInvoiceValidator,
  updatePurchaseInvoiceValidator
} from "../validators/purchaseInvoice.validator.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);

router
  .route("/")
  .get(
    authorize(
      "admin",
      "manager",
      "accountant",
      "purchase"
    ),
    listPurchaseInvoices
  )
  .post(
    authorize(
      "admin",
      "manager",
      "accountant",
      "purchase"
    ),
    createPurchaseInvoiceValidator,
    createPurchaseInvoice
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant",
      "purchase"
    ),
    getPurchaseInvoice
  )
  .put(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant",
      "purchase"
    ),
    updatePurchaseInvoiceValidator,
    updatePurchaseInvoice
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deletePurchaseInvoice
  );

export default router;
