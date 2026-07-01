import mongoose from "mongoose";

import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

await mongoose.connect(process.env.MONGODB_URI);

const email = "admin@keynoteerp.com";

const exists = await User.findOne({ email });

if (exists) {
  console.log("Admin already exists.");
  process.exit(0);
}

await User.create({
  firstName: "System",
  lastName: "Admin",
  email,
  password: hashPassword("Admin@123"),
  role: "admin",
  isActive: true
});

console.log("Admin created successfully.");

await mongoose.disconnect();
