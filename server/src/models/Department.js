// server/src/models/Department.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model(
  "Department",
  departmentSchema
);
