// server/src/routes/salesInvoice.routes.js

import { Router } from "express";

import {
  createSalesInvoice,
  getSalesInvoice,
  listSalesInvoices,
  updateSalesInvoice,
  deleteSalesInvoice
} from "../controllers/SalesInvoiceController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
  createSalesInvoiceValidator,
  updateSalesInvoiceValidator
} from "../validators/salesInvoice.validator.js";

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
      "sales"
    ),
    listSalesInvoices
  )
  .post(
    authorize(
      "admin",
      "manager",
      "accountant",
      "sales"
    ),
    createSalesInvoiceValidator,
    createSalesInvoice
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant",
      "sales"
    ),
    getSalesInvoice
  )
  .put(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant",
      "sales"
    ),
    updateSalesInvoiceValidator,
    updateSalesInvoice
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteSalesInvoice
  );

export default router;
