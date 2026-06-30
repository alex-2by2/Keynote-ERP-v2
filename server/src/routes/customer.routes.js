// server/src/routes/customer.routes.js

import { Router } from "express";

import {
  createCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
  deleteCustomer
} from "../controllers/CustomerController.js";

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
    listCustomers
  )
  .post(
    authorize("admin"),
    createCustomer
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getCustomer
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateCustomer
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteCustomer
  );

export default router;
