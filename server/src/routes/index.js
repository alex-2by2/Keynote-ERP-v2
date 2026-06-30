// server/src/routes/index.js

import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import roleRoutes from "./role.routes.js";
import permissionRoutes from "./permission.routes.js";
import departmentRoutes from "./department.routes.js";

const router = Router();

router.use("/health", healthRoutes);

router.use("/auth", authRoutes);

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/departments", departmentRoutes);

export default router;
