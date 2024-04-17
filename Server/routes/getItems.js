const express = require("express");
const router = express.Router();
const ItemModel = require("../models/ItemModel");
router.get("/", (req, res) => {
  ItemModel.find()
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

module.exports = router;
