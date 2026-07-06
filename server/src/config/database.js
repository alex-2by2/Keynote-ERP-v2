import mongoose from "mongoose";

import { env } from "./env.js";

export async function connectDatabase() {
  await mongoose.connect(env.mongoUri, {
    autoIndex: false
  });

  console.log("MongoDB connected");
}
