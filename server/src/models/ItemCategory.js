// server/src/models/ItemCategory.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const itemCategorySchema = new Schema(
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
      maxlength: 150
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "ItemCategory",
      default: null,
      index: true
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

itemCategorySchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "ItemCategory",
  itemCategorySchema
);
