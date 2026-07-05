// server/src/models/PurchaseInvoice.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const purchaseInvoiceItemSchema = new Schema(
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

    unitCost: {
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

const purchaseInvoiceSchema = new Schema(
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
      required: true,
      index: true
    },

    purchaseOrder: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      default: null
    },

    goodsReceipt: {
      type: Schema.Types.ObjectId,
      ref: "GoodsReceipt",
      default: null
    },

    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
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
      type: [purchaseInvoiceItemSchema],
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

purchaseInvoiceSchema.index(
  {
    company: 1,
    invoiceNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "PurchaseInvoice",
  purchaseInvoiceSchema
);
