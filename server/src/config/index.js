// server/src/config/index.js

import dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    name:
      process.env.APP_NAME ||
      "Keynote ERP",

    env:
      process.env.NODE_ENV ||
      "development",

    port:
      Number(process.env.PORT) ||
      5000,

    apiPrefix:
      process.env.API_PREFIX ||
      "/api"
  },

  database: {
    uri: process.env.MONGODB_URI
  },

  jwt: {
    secret:
      process.env.JWT_SECRET,

    expiresIn:
      process.env.JWT_EXPIRES_IN ||
      "7d"
  },

  cors: {
    origin:
      process.env.CORS_ORIGIN
        ?.split(",")
        .map(origin => origin.trim()) ||
      [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://keynote-erp-v2-1.onrender.com"
      ]
  },

  upload: {
    directory:
      process.env.UPLOAD_DIR ||
      "uploads",

    maxFileSize:
      Number(
        process.env.MAX_FILE_SIZE
      ) ||
      10 * 1024 * 1024
  },

  mail: {
    host:
      process.env.SMTP_HOST,

    port:
      Number(
        process.env.SMTP_PORT
      ) || 587,

    user:
      process.env.SMTP_USER,

    password:
      process.env.SMTP_PASSWORD
  }
};

export default config;
