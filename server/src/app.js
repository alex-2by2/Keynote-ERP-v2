import express from "express";
import cors from "cors";
import morgan from "morgan";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(morgan("combined"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Keynote ERP v2",
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
