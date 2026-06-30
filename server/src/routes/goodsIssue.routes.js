// server/src/routes/goodsIssue.routes.js

import { Router } from "express";

import {
  createGoodsIssue,
  getGoodsIssue,
  listGoodsIssues,
  updateGoodsIssue,
  deleteGoodsIssue
} from "../controllers/GoodsIssueController.js";

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
    listGoodsIssues
  )
  .post(
    authorize("admin", "manager"),
    createGoodsIssue
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager"),
    getGoodsIssue
  )
  .put(
    validateObjectId(),
    authorize("admin", "manager"),
    updateGoodsIssue
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteGoodsIssue
  );

export default router;
