// server/src/routes/goodsReceipt.routes.js

import { Router } from "express";

import {
  createGoodsReceipt,
  getGoodsReceipt,
  listGoodsReceipts,
  updateGoodsReceipt,
  deleteGoodsReceipt
} from "../controllers/GoodsReceiptController.js";

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
    listGoodsReceipts
  )
  .post(
    authorize("admin", "manager"),
    createGoodsReceipt
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getGoodsReceipt
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateGoodsReceipt
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteGoodsReceipt
  );

export default router;
