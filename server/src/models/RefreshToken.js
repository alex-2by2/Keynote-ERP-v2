// server/src/models/RefreshToken.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    token: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true
    },

    revokedAt: {
      type: Date,
      default: null
    },

    createdByIp: {
      type: String,
      trim: true,
      default: null
    },

    revokedByIp: {
      type: String,
      trim: true,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

refreshTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export default mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);
