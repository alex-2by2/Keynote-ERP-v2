// server/src/models/Payment.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
      index: true
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
      index: true
    },

    purchaseInvoice: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseInvoice",
      default: null
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

    paymentNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    paymentDate: {
      type: Date,
      required: true
    },

    paymentMethod: {
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

paymentSchema.index(
  {
    company: 1,
    paymentNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Payment",
  paymentSchema
);
