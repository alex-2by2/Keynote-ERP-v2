// server/src/models/Branch.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const branchSchema = new Schema(
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

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null
    },

    phone: {
      type: String,
      trim: true,
      default: null
    },

    address: {
      type: String,
      trim: true,
      default: ""
    },

    city: {
      type: String,
      trim: true,
      default: ""
    },

    state: {
      type: String,
      trim: true,
      default: ""
    },

    country: {
      type: String,
      trim: true,
      default: ""
    },

    postalCode: {
      type: String,
      trim: true,
      default: ""
    },

    manager: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
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

export default mongoose.model(
  "Branch",
  branchSchema
);
