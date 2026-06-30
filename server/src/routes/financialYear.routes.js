// server/src/routes/financialYear.routes.js

import { Router } from "express";

import {
  createFinancialYear,
  getFinancialYear,
  listFinancialYears,
  updateFinancialYear,
  deleteFinancialYear
} from "../controllers/FinancialYearController.js";

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
    listFinancialYears
  )
  .post(
    authorize("admin"),
    createFinancialYear
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getFinancialYear
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateFinancialYear
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteFinancialYear
  );

export default router;
