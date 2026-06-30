// server/src/routes/user.routes.js

import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser
} from "../controllers/UserController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import ownerOrRole from "../middleware/ownerOrRole.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

/*
 * All User routes require authentication.
 */
router.use(authenticate);
router.use(currentUser);

/*
 * GET /users
 * Admin, Manager
 */
router.get(
  "/",
  authorize("admin", "manager"),
  listUsers
);

/*
 * POST /users
 * Admin only
 */
router.post(
  "/",
  authorize("admin"),
  createUser
);

/*
 * GET /users/:id
 * Owner, Admin, Manager
 */
router.get(
  "/:id",
  validateObjectId(),
  ownerOrRole("admin", "manager"),
  getUser
);

/*
 * PUT /users/:id
 * Owner, Admin
 */
router.put(
  "/:id",
  validateObjectId(),
  ownerOrRole("admin"),
  updateUser
);

/*
 * DELETE /users/:id
 * Admin only
 */
router.delete(
  "/:id",
  validateObjectId(),
  authorize("admin"),
  deleteUser
);

export default router;
