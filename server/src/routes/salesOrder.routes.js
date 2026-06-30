// server/src/routes/salesOrder.routes.js

import { Router } from "express";

import {
  createSalesOrder,
  getSalesOrder,
  listSalesOrders,
  updateSalesOrder,
  deleteSalesOrder
} from "../controllers/SalesOrderController.js";

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
    listSalesOrders
  )
  .post(
    authorize("admin", "manager"),
    createSalesOrder
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getSalesOrder
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateSalesOrder
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteSalesOrder
  );

export default router;
