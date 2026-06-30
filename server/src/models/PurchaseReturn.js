// server/src/models/PurchaseReturn.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const purchaseReturnItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true
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

    reason: {
      type: String,
      trim: true,
      default: ""
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

const purchaseReturnSchema = new Schema(
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

    returnNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    returnDate: {
      type: Date,
      required: true
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

    items: {
      type: [purchaseReturnItemSchema],
      default: []
    },

    totalAmount: {
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

purchaseReturnSchema.index(
  {
    company: 1,
    returnNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "PurchaseReturn",
  purchaseReturnSchema
);
