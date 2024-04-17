const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: String,
  calories: String,
  price: String,
  category: String,
  imageAsset: String,
  quantity: Number,
  userId: String,
});

const ItemModel = mongoose.model("items", ItemSchema);

module.exports = ItemModel;
