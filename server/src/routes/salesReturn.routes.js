// server/src/routes/salesReturn.routes.js

import { Router } from "express";

import {
  createSalesReturn,
  getSalesReturn,
  listSalesReturns,
  updateSalesReturn,
  deleteSalesReturn
} from "../controllers/SalesReturnController.js";

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
    listSalesReturns
  )
  .post(
    authorize("admin", "manager"),
    createSalesReturn
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getSalesReturn
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateSalesReturn
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteSalesReturn
  );

export default router;
