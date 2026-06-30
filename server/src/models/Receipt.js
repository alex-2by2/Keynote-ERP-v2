// server/src/models/Receipt.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const receiptSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true
    },

    salesInvoice: {
      type: Schema.Types.ObjectId,
      ref: "SalesInvoice",
      default: null
    },

    accountLedger: {
      type: Schema.Types.ObjectId,
      ref: "AccountLedger",
      required: true
    },

    voucher: {
      type: Schema.Types.ObjectId,
      ref: "Voucher",
      default: null
    },

    receiptNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    receiptDate: {
      type: Date,
      required: true
    },

    receiptMethod: {
      type: String,
      enum: [
        "CASH",
        "BANK",
        "CHEQUE",
        "UPI",
        "CARD",
        "NEFT",
        "RTGS",
        "IMPS"
      ],
      default: "CASH"
    },

    referenceNumber: {
      type: String,
      trim: true,
      default: ""
    },

    amount: {
      type: Number,
      required: true,
      min: 0
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

    remarks: {
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

receiptSchema.index(
  {
    company: 1,
    receiptNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Receipt",
  receiptSchema
);
