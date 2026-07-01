import mongoose from "mongoose";

const { Schema } = mongoose;

const rolePermissionSchema = new Schema(
  {
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true
    },

    permission: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

rolePermissionSchema.index(
  {
    role: 1,
    permission: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "RolePermission",
  rolePermissionSchema
);
