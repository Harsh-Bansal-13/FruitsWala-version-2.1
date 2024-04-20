const mongoose = require("mongoose");

// Define the schema for an item within the cart
const ItemSchema = new mongoose.Schema({
  _id: String,
  title: String,
  calories: String,
  price: String,
  category: String,
  imageAsset: String,
  quantity: Number,
  userId: String,
  id: String,
});

const CartItemSchema = new mongoose.Schema({
  id: String,
  items: [ItemSchema], // Using the ItemSchema here
});

const CartItemModel = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItemModel;
