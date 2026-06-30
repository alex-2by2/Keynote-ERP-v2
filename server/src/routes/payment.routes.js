// server/src/routes/payment.routes.js

import { Router } from "express";

import {
  createPayment,
  getPayment,
  listPayments,
  updatePayment,
  deletePayment
} from "../controllers/PaymentController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
  createPaymentValidator,
  updatePaymentValidator
} from "../validators/payment.validator.js";

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
    listPayments
  )
  .post(
    authorize(
      "admin",
      "manager",
      "accountant"
    ),
    createPaymentValidator,
    createPayment
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
    getPayment
  )
  .put(
    validateObjectId(),
    authorize(
      "admin",
      "manager",
      "accountant"
    ),
    updatePaymentValidator,
    updatePayment
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deletePayment
  );

export default router;
