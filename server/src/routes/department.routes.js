// server/src/routes/department.routes.js

import { Router } from "express";

import {
  createDepartment,
  getDepartment,
  listDepartments,
  updateDepartment,
  deleteDepartment
} from "../controllers/DepartmentController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);
router.use(authorize("admin", "manager"));

router
  .route("/")
  .get(listDepartments)
  .post(createDepartment);

router
  .route("/:id")
  .get(validateObjectId(), getDepartment)
  .put(validateObjectId(), updateDepartment)
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteDepartment
  );

export default router;
