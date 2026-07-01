import mongoose from "mongoose";

const { Schema } = mongoose;

const userRoleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
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

userRoleSchema.index(
  {
    user: 1,
    role: 1,
    company: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "UserRole",
  userRoleSchema
);
