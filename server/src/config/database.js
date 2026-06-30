import mongoose from "mongoose";

export async function connectDatabase() {
  await mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: false
  });

  console.log("MongoDB connected");
}
