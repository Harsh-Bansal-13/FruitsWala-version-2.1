const CartItemModel = require("../models/CartItemModal");
const ItemModel = require("../models/ItemModel");

const router = require("express").Router();

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

    let cartItem = await CartItemModel.findOne({ id });

    if (!cartItem) {
      cartItem = new CartItemModel({ id });
    }

    const existingItemIndex = cartItem.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (existingItemIndex !== -1) {
      cartItem.items[existingItemIndex].quantity += 1;
    } else {
      const item = await ItemModel.findById(itemId);
      console.log(item);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      cartItem.items.push({ ...item.toObject(), quantity: 1 });
    }

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
