// server/src/models/StockTransfer.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const stockTransferItemSchema = new Schema(
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

    lineTotal: {
      type: Number,
      required: true,
      min: 0
    },

    remarks: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    _id: false
  }
);

const stockTransferSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    fromWarehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true
    },

    toWarehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true
    },

    transferNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    transferDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "IN_TRANSIT",
        "RECEIVED",
        "CANCELLED"
      ],
      default: "DRAFT",
      index: true
    },

    items: {
      type: [stockTransferItemSchema],
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

stockTransferSchema.index(
  {
    company: 1,
    transferNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "StockTransfer",
  stockTransferSchema
);
