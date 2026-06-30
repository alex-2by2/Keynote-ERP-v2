// server/src/models/PurchaseOrder.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const purchaseOrderItemSchema = new Schema(
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

    taxPercent: {
      type: Number,
      default: 0,
      min: 0
    },

    discountPercent: {
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

const purchaseOrderSchema = new Schema(
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

    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true
    },

    orderNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    orderDate: {
      type: Date,
      required: true
    },

    expectedDate: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "APPROVED",
        "PARTIALLY_RECEIVED",
        "RECEIVED",
        "CANCELLED"
      ],
      default: "DRAFT",
      index: true
    },

    items: {
      type: [purchaseOrderItemSchema],
      default: []
    },

    subTotal: {
      type: Number,
      default: 0,
      min: 0
    },

    taxTotal: {
      type: Number,
      default: 0,
      min: 0
    },

    discountTotal: {
      type: Number,
      default: 0,
      min: 0
    },

    grandTotal: {
      type: Number,
      default: 0,
      min: 0
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

purchaseOrderSchema.index(
  {
    company: 1,
    orderNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);
