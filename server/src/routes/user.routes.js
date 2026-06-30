// server/src/routes/user.routes.js

import { Router } from "express";

import authenticate from "../middleware/authenticate.js";
import validateObjectId from "../middleware/validateObjectId.js";

import {
  createUser,
  getUser,
  listUsers,
  updateUser,
  deleteUser
} from "../controllers/UserController.js";

const router = Router();

router.use(authenticate);

router
  .route("/")
  .get(listUsers)
  .post(createUser);

router
  .route("/:id")
  .get(validateObjectId(), getUser)
  .put(validateObjectId(), updateUser)
  .delete(validateObjectId(), deleteUser);

export default router;
