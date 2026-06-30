// server/src/models/SalesInvoice.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const salesInvoiceItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.000001
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },

    discount: {
      type: Number,
      default: 0,
      min: 0
    },

    taxPercentage: {
      type: Number,
      default: 0,
      min: 0
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    lineTotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    _id: false
  }
);

const salesInvoiceSchema = new Schema(
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

    salesOrder: {
      type: Schema.Types.ObjectId,
      ref: "SalesOrder",
      default: null
    },

    goodsIssue: {
      type: Schema.Types.ObjectId,
      ref: "GoodsIssue",
      default: null
    },

    voucher: {
      type: Schema.Types.ObjectId,
      ref: "Voucher",
      default: null
    },

    invoiceNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    invoiceDate: {
      type: Date,
      required: true
    },

    dueDate: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "POSTED",
        "PAID",
        "CANCELLED"
      ],
      default: "DRAFT",
      index: true
    },

    items: {
      type: [salesInvoiceItemSchema],
      default: []
    },

    subTotal: {
      type: Number,
      default: 0
    },

    discountTotal: {
      type: Number,
      default: 0
    },

    taxTotal: {
      type: Number,
      default: 0
    },

    grandTotal: {
      type: Number,
      default: 0
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

salesInvoiceSchema.index(
  {
    company: 1,
    invoiceNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "SalesInvoice",
  salesInvoiceSchema
);
