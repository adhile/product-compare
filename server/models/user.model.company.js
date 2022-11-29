import { mongoose } from "mongoose";

const companies = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { collection: "companies" }
);

export const modelC = mongoose.model("Data", companies);
