// server/src/routes/company.routes.js

import { Router } from "express";

import {
  createCompany,
  getCompany,
  listCompanies,
  updateCompany,
  deleteCompany
} from "../controllers/CompanyController.js";

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
    listCompanies
  )
  .post(
    authorize("admin"),
    createCompany
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getCompany
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateCompany
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteCompany
  );

export default router;
