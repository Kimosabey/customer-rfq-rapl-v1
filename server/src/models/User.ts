import { Schema, model } from "mongoose";

export const ROLES = ["BD", "Engineering", "CFT", "SCM", "Estimation", "CEO_COO", "Admin"] as const;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ROLES, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
