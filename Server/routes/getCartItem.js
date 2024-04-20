const CartItemModel = require("../models/CartItemModal");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the cart item by user id
    const cartItem = await CartItemModel.findOne({ id });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ cartItems: cartItem.items });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
