const CartItemModel = require("../models/CartItemModal");
const ItemModel = require("../models/ItemModel");

const router = require("express").Router();

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

    // Find the cart item by id
    let cartItem = await CartItemModel.findOne({ id });

    // If no cart item is found, create a new one
    if (!cartItem) {
      cartItem = new CartItemModel({ id });
    }

    // Check if the item is already in the cart
    const existingItemIndex = cartItem.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    // If the item is already in the cart, increase its quantity by one
    if (existingItemIndex !== -1) {
      cartItem.items[existingItemIndex].quantity += 1;
    } else {
      // If the item is not in the cart, find it and add it with quantity 1
      const item = await ItemModel.findById(itemId);
      console.log(item);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      cartItem.items.push({ ...item.toObject(), quantity: 1 });
    }

    // Save the cart item
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Item added to cartItem successfully", cartItem });
  } catch (error) {
    console.error("Error adding item to cartItem:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
