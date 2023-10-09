const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    color: {
      type: String,
      required: [true, "Category color is required"],
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Category = new mongoose.model("Category", categoriesSchema);

module.exports = Category;
