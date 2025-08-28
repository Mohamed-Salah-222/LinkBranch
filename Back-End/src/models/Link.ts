import mongoose, { Schema, Document } from "mongoose";
import type { Link as LinkType } from "../../../packages/types/index.js";
export interface ILink extends LinkType, Document {}

const linkSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Link = mongoose.model<ILink>("Link", linkSchema);

export default Link;
