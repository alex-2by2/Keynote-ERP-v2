// server/src/models/CostCenter.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const costCenterSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
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

    description: {
      type: String,
      trim: true,
      default: ""
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
      index: true
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

costCenterSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "CostCenter",
  costCenterSchema
);
