// server/src/models/GoodsReceipt.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const goodsReceiptItemSchema = new Schema(
  {
    purchaseOrderItemId: {
      type: Schema.Types.ObjectId,
      required: true
    },

    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    orderedQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    receivedQuantity: {
      type: Number,
      required: true,
      min: 0.000001
    },

    acceptedQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    rejectedQuantity: {
      type: Number,
      default: 0,
      min: 0
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
    }
  },
  {
    _id: false
  }
);

const goodsReceiptSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    purchaseOrder: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
      index: true
    },

    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
      index: true
    },

    receiptNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    receiptDate: {
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
      type: [goodsReceiptItemSchema],
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

goodsReceiptSchema.index(
  {
    company: 1,
    receiptNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "GoodsReceipt",
  goodsReceiptSchema
);
