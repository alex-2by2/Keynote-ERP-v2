// server/src/routes/accountLedger.routes.js

import { Router } from "express";

import {
  createAccountLedger,
  getAccountLedger,
  listAccountLedgers,
  updateAccountLedger,
  deleteAccountLedger
} from "../controllers/AccountLedgerController.js";

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
    listAccountLedgers
  )
  .post(
    authorize("admin"),
    createAccountLedger
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getAccountLedger
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateAccountLedger
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteAccountLedger
  );

export default router;
