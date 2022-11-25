import mongoose from "mongoose";
//creating product schema
const Product = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    ratings: { type: String, required: true },
  },
  { collection: "productsData" }
);

export const model = mongoose.model("productData", Product);
