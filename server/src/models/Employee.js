// server/src/models/Employee.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    employeeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true
    },

    designation: {
      type: Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
      index: true
    },

    reportingManager: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
      index: true
    },

    joiningDate: {
      type: Date,
      required: true
    },

    employmentType: {
      type: String,
      enum: [
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERN"
      ],
      default: "FULL_TIME",
      index: true
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE",
        "RESIGNED",
        "TERMINATED"
      ],
      default: "ACTIVE",
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

employeeSchema.index({
  department: 1,
  designation: 1
});

export default mongoose.model(
  "Employee",
  employeeSchema
);
