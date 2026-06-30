// server/src/models/Voucher.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const voucherEntrySchema = new Schema(
  {
    ledger: {
      type: Schema.Types.ObjectId,
      ref: "AccountLedger",
      required: true
    },

    debit: {
      type: Number,
      default: 0,
      min: 0
    },

    credit: {
      type: Number,
      default: 0,
      min: 0
    },

    narration: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    _id: false
  }
);

const voucherSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    financialYear: {
      type: Schema.Types.ObjectId,
      ref: "FinancialYear",
      required: true,
      index: true
    },

    voucherType: {
      type: String,
      enum: [
        "PAYMENT",
        "RECEIPT",
        "JOURNAL",
        "CONTRA",
        "PURCHASE",
        "SALES"
      ],
      required: true,
      index: true
    },

    voucherNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    voucherDate: {
      type: Date,
      required: true
    },

    entries: {
      type: [voucherEntrySchema],
      default: []
    },

    totalDebit: {
      type: Number,
      default: 0
    },

    totalCredit: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "POSTED",
        "CANCELLED"
      ],
      default: "DRAFT",
      index: true
    },

    narration: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

voucherSchema.index(
  {
    company: 1,
    voucherNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Voucher",
  voucherSchema
);
