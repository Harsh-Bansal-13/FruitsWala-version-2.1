const CartItemModel = require("../models/CartItemModal");
const ItemModel = require("../models/ItemModel");

const router = require("express").Router();

router.post("/:userId/items/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    // Find the cartItem by its custom id
    let cartItem = await CartItemModel.findOne({ id: userId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Find the item within the cartItem's items array
    const itemIndex = cartItem.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    // If the item is not found in the cart, return 404
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // If the quantity of the item is greater than 1, reduce it by 1
    if (cartItem.items[itemIndex].quantity > 1) {
      cartItem.items[itemIndex].quantity -= 1;
    } else {
      // If the quantity is 1 or less, remove the item from the cart
      cartItem.items.splice(itemIndex, 1);
    }

    // Save the cartItem
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Item quantity updated in cartItem", cartItem });
  } catch (error) {
    console.error("Error updating item quantity in cartItem:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
