// server/src/models/Stock.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true
    },

    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    reservedQuantity: {
      type: Number,
      default: 0,
      min: 0
    },

    averageCost: {
      type: Number,
      default: 0,
      min: 0
    },

    lastReceiptDate: {
      type: Date,
      default: null
    },

    lastIssueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

stockSchema.index(
  {
    company: 1,
    warehouse: 1,
    item: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "Stock",
  stockSchema
);
