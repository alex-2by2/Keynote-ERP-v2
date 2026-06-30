// server/src/models/Item.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "ItemCategory",
      required: true,
      index: true
    },

    unit: {
      type: Schema.Types.ObjectId,
      ref: "UnitOfMeasure",
      required: true,
      index: true
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    itemType: {
      type: String,
      enum: [
        "RAW_MATERIAL",
        "FINISHED_GOOD",
        "SEMI_FINISHED",
        "SERVICE",
        "CONSUMABLE"
      ],
      default: "FINISHED_GOOD",
      index: true
    },

    purchasePrice: {
      type: Number,
      default: 0,
      min: 0
    },

    sellingPrice: {
      type: Number,
      default: 0,
      min: 0
    },

    minimumStock: {
      type: Number,
      default: 0,
      min: 0
    },

    maximumStock: {
      type: Number,
      default: 0,
      min: 0
    },

    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

itemSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

itemSchema.index(
  {
    company: 1,
    sku: 1
  },
  {
    unique: true
  }
);

export default mongoose.model("Item", itemSchema);
