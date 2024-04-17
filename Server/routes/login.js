const bcrypt = require("bcrypt");
const router = require("express").Router();
const cookieParser = require("cookie-parser");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  try {
    const { email, password, isSeller } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      // User not found, send a response and exit the function
      return res.json("User not exist");
    }

    const response = await bcrypt.compare(password, user.password);

    if (response) {
      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          isSeller: user.isSeller,
          id: user._id.toHexString(),
        },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );
      res.cookie("fwa_auth_token", token, {
        expires: new Date(Date.now() + 25892000000),
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      return res.json("Success");
    } else {
      return res.json("Password is incorrect");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
