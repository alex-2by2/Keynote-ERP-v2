// server/src/models/SalesReturn.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const salesReturnItemSchema = new Schema(
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

    unitPrice: {
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

const salesReturnSchema = new Schema(
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
      type: [salesReturnItemSchema],
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

salesReturnSchema.index(
  {
    company: 1,
    returnNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "SalesReturn",
  salesReturnSchema
);
