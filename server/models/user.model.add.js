import { mongoose } from "mongoose";

const add = new mongoose.Schema(
  {
    companyId: { type: Array, required: true },
    primaryText: { type: String, required: true },
    headline: { type: String, required: true },
    description: { type: String },
    CTA: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { collection: "adds" }
);

export const modelAdd = mongoose.model("DataAdd", add);
