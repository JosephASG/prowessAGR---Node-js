import mongoose from "mongoose";

// create mongoose schema for User
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true, // auto insert timestamps into each document
    versionKey: false, // disable versioning
  }
);

// create mongoose model for User
const Category = mongoose.model("Category", CategorySchema);
export default Category;
