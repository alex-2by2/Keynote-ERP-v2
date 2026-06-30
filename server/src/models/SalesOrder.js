// server/src/models/SalesOrder.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const salesOrderItemSchema = new Schema(
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

    discountPercent: {
      type: Number,
      default: 0,
      min: 0
    },

    taxPercent: {
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

const salesOrderSchema = new Schema(
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

    deliveryDate: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "CONFIRMED",
        "PARTIALLY_DELIVERED",
        "DELIVERED",
        "CANCELLED"
      ],
      default: "DRAFT",
      index: true
    },

    items: {
      type: [salesOrderItemSchema],
      default: []
    },

    subTotal: {
      type: Number,
      default: 0
    },

    taxTotal: {
      type: Number,
      default: 0
    },

    discountTotal: {
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

salesOrderSchema.index(
  {
    company: 1,
    orderNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "SalesOrder",
  salesOrderSchema
);
