import mongoose, { Schema, Document } from "mongoose";
import type { User as UserType } from "../../../packages/types/index.js";
export interface IUser extends Omit<UserType, "_id">, Document {}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    profileImageUrl: {
      type: String,
      required: false,
    },
    appearance: {
      theme: { type: String, required: false },
      backgroundColor: { type: String, required: false },
      buttonColor: { type: String, required: false },
      font: { type: String, required: false },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
