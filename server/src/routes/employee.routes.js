// server/src/routes/employee.routes.js

import { Router } from "express";

import {
  createEmployee,
  getEmployee,
  listEmployees,
  updateEmployee,
  deleteEmployee
} from "../controllers/EmployeeController.js";

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
    listEmployees
  )
  .post(
    authorize("admin", "manager"),
    createEmployee
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getEmployee
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateEmployee
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteEmployee
  );

export default router;
