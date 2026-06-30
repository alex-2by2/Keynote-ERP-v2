import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Keynote ERP v2 API",
    version: "2.0.0"
  });
});

export default router;
