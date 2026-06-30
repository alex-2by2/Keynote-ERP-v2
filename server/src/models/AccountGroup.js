// server/src/models/AccountGroup.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const accountGroupSchema = new Schema(
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

    parentGroup: {
      type: Schema.Types.ObjectId,
      ref: "AccountGroup",
      default: null,
      index: true
    },

    nature: {
      type: String,
      enum: [
        "ASSET",
        "LIABILITY",
        "INCOME",
        "EXPENSE",
        "EQUITY"
      ],
      required: true,
      index: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
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

accountGroupSchema.index(
  {
    company: 1,
    code: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "AccountGroup",
  accountGroupSchema
);
