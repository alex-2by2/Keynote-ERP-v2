// server/src/models/Permission.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const permissionSchema = new Schema(
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
      trim: true
    },

    module: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
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
  "Permission",
  permissionSchema
);
