// server/src/models/Role.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema(
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

    description: {
      type: String,
      trim: true,
      default: ""
    },


    system: {
      type: Boolean,
      default: false,
      index: true
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

export default mongoose.model("Role", roleSchema);
