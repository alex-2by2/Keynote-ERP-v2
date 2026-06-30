// server/src/models/InventoryTransaction.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const inventoryTransactionSchema = new Schema(
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

    transactionType: {
      type: String,
      enum: [
        "OPENING",
        "PURCHASE_RECEIPT",
        "PURCHASE_RETURN",
        "SALES_ISSUE",
        "SALES_RETURN",
        "TRANSFER_IN",
        "TRANSFER_OUT",
        "ADJUSTMENT",
        "PRODUCTION_IN",
        "PRODUCTION_OUT"
      ],
      required: true,
      index: true
    },

    referenceType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    referenceId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },

    referenceNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    transactionDate: {
      type: Date,
      required: true,
      index: true
    },

    quantityIn: {
      type: Number,
      default: 0,
      min: 0
    },

    quantityOut: {
      type: Number,
      default: 0,
      min: 0
    },

    unitCost: {
      type: Number,
      default: 0,
      min: 0
    },

    balanceQuantity: {
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

inventoryTransactionSchema.index({
  company: 1,
  warehouse: 1,
  item: 1,
  transactionDate: -1
});

export default mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);
