// server/src/models/Company.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },

    legalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
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

    website: {
      type: String,
      trim: true,
      default: null
    },

    taxNumber: {
      type: String,
      trim: true,
      default: null,
      index: true
    },

    registrationNumber: {
      type: String,
      trim: true,
      default: null,
      index: true
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      maxlength: 10
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata"
    },

    fiscalYearStartMonth: {
      type: Number,
      min: 1,
      max: 12,
      default: 4
    },

    headquarters: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
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
  "Company",
  companySchema
);
