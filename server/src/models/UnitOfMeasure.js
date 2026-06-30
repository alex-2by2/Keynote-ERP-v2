// server/src/models/UnitOfMeasure.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const unitOfMeasureSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 20
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    baseUnit: {
      type: Boolean,
      default: false,
      index: true
    },

    conversionFactor: {
      type: Number,
      required: true,
      min: 0.000001,
      default: 1
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

unitOfMeasureSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "UnitOfMeasure",
  unitOfMeasureSchema
);
