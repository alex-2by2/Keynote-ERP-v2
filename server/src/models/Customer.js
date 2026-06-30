// server/src/models/Customer.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema(
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
      maxlength: 200
    },

    contactPerson: {
      type: String,
      trim: true,
      default: ""
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ""
    },

    phone: {
      type: String,
      trim: true,
      default: ""
    },

    taxNumber: {
      type: String,
      trim: true,
      default: ""
    },

    creditLimit: {
      type: Number,
      default: 0,
      min: 0
    },

    paymentTerms: {
      type: Number,
      default: 30,
      min: 0
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

customerSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Customer",
  customerSchema
);
