const CartItemModel = require("../models/CartItemModal");
const router = require("express").Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the cart item by user id
    const deletedCartItem = await CartItemModel.findOneAndDelete({ id });

    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
