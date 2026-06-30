// server/src/models/Warehouse.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const warehouseSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    address: {
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

warehouseSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Warehouse",
  warehouseSchema
);
