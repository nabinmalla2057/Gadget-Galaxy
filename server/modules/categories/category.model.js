const { Schema, model } = require("mongoose");
const CategorySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String },
  skus: [skuSchema],
});

module.exports = model("Category", CategorySchema);
