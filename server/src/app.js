import express from "express";
import cors from "cors";
import morgan from "morgan";

import apiRoutes from "./routes/index.js";
import requestId from "./middleware/requestId.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", true);

app.use(requestId);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(morgan("combined"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    application: "Keynote ERP v2",
    version: "2.0.0"
  });
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
// server/src/app.js

import requestLogger from "./middleware/requestLogger.js";

app.use(requestLogger);
import {
  helmetMiddleware,
  corsMiddleware,
  compressionMiddleware,
  apiLimiter
} from "./config/security.js";

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(apiLimiter);

