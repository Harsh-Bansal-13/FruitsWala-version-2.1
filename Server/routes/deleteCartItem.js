const CartItemModel = require("../models/CartItemModal");
const ItemModel = require("../models/ItemModel");

const router = require("express").Router();

router.post("/:userId/items/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    let cartItem = await CartItemModel.findOne({ id: userId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const itemIndex = cartItem.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    if (cartItem.items[itemIndex].quantity > 1) {
      cartItem.items[itemIndex].quantity -= 1;
    } else {
      cartItem.items.splice(itemIndex, 1);
    }

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
