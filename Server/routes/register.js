const bcrypt = require("bcrypt");
const router = require("express").Router();
const cookieParser = require("cookie-parser");
const UserModel = require("../models/UserModel");

router.post("/", (req, res) => {
  const { username, email, password, isSeller } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash, isSeller })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
