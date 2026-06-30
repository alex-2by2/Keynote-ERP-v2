// server/src/models/AccountLedger.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const accountLedgerSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    accountGroup: {
      type: Schema.Types.ObjectId,
      ref: "AccountGroup",
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

    openingBalance: {
      type: Number,
      default: 0
    },

    openingBalanceType: {
      type: String,
      enum: ["DEBIT", "CREDIT"],
      default: "DEBIT"
    },

    currentBalance: {
      type: Number,
      default: 0
    },

    balanceType: {
      type: String,
      enum: ["DEBIT", "CREDIT"],
      default: "DEBIT"
    },

    gstNumber: {
      type: String,
      trim: true,
      default: ""
    },

    panNumber: {
      type: String,
      trim: true,
      default: ""
    },

    phone: {
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

    address: {
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

accountLedgerSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "AccountLedger",
  accountLedgerSchema
);
