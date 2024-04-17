const router = require("express").Router();
const cookieParser = require("cookie-parser");
const ItemModel = require("../models/ItemModel");

router.post("/", (req, res) => {
  const { deletedItemId } = req.body;
  ItemModel.findByIdAndDelete(deletedItemId)
    .then((deletedItem) => {
      if (!deletedItem) {
        // If no item was found with the given ID, send a 404 status
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item deleted successfully", deletedItem });
    })
    .catch((err) => {
      // If there was an error during the deletion process, send a 500 status
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
