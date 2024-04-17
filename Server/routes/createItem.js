const bcrypt = require("bcrypt");
const router = require("express").Router();
const cookieParser = require("cookie-parser");
const ItemModel = require("../models/ItemModel");
const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
  const token = req.cookies.fwa_auth_token;
  if (!token) {
    return res.json("The token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("The token is wrong");
      } else {
        req.email = decoded.email;
        req.username = decoded.username;
        req.isSeller = decoded.isSeller;
        req.id = decoded.id;
        next();
      }
    });
  }
};
router.post("/", verifyUser, (req, res) => {
  const { title, calories, price, category, imageAsset, quantity, userId } =
    req.body;
  ItemModel.create({
    title,
    calories,
    price,
    category,
    imageAsset,
    quantity,
    userId,
  })
    .then((result) => {
      res.json("success");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
