const router = require("express").Router();
const cookieParser = require("cookie-parser");
const ItemModel = require("../models/ItemModel");

router.post("/", (req, res) => {
  const { deletedItemId } = req.body;
  ItemModel.findByIdAndDelete(deletedItemId)
    .then((deletedItem) => {
      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item deleted successfully", deletedItem });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
