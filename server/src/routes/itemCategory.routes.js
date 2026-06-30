// server/src/routes/itemCategory.routes.js

import { Router } from "express";

import {
  createItemCategory,
  getItemCategory,
  listItemCategories,
  updateItemCategory,
  deleteItemCategory
} from "../controllers/ItemCategoryController.js";

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
    listItemCategories
  )
  .post(
    authorize("admin"),
    createItemCategory
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getItemCategory
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateItemCategory
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteItemCategory
  );

export default router;
