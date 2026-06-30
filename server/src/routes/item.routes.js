// server/src/routes/item.routes.js

import { Router } from "express";

import {
  createItem,
  getItem,
  listItems,
  updateItem,
  deleteItem
} from "../controllers/ItemController.js";

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
    listItems
  )
  .post(
    authorize("admin"),
    createItem
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getItem
  )
  .put(
    validateObjectId(),
    authorize("admin"),
    updateItem
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteItem
  );

export default router;
