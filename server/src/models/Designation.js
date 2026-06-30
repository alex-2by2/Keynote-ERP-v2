// server/src/models/Designation.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const designationSchema = new Schema(
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

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true
    },

    level: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
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

designationSchema.index(
  {
    department: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Designation",
  designationSchema
);
