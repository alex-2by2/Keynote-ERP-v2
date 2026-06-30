// server/src/routes/voucher.routes.js

import { Router } from "express";

import {
  createVoucher,
  getVoucher,
  listVouchers,
  updateVoucher,
  deleteVoucher
} from "../controllers/VoucherController.js";

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
    authorize("admin", "manager", "accountant"),
    listVouchers
  )
  .post(
    authorize("admin", "accountant"),
    createVoucher
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager", "accountant"),
    getVoucher
  )
  .put(
    validateObjectId(),
    authorize("admin", "accountant"),
    updateVoucher
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteVoucher
  );

export default router;
