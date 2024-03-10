const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const UserModel = require("./models/UserModel");
const ItemModel = require("./models/ItemModel");
const { type } = require("os");
const fs = require("fs");
const temp = require("dotenv").config();
const port = process.env.PORT || 4000;
const url = process.env.URL_MONGODB;
const app = express();
app.use(express.json());
app.use(
  cors({
    // origin: ["http://localhost:3000"],
    origin: ["https://fruits-wala-version-2-1-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB Atlas database");
  })
  .catch((err) => {
    console.log(url);
    console.log("MongoDB Atlas server not connected");
    console.error(err);
  });

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

app.get("/", verifyUser, (req, res) => {
  return res.json({
    email: req.email,
    username: req.username,
    isSeller: req.isSeller,
    id: req.id,
  });
});

app.post("/register", (req, res) => {
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

app.post("/login", async (req, res) => {
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
      res.cookie("fwa_auth_token", token, { maxAge: 86400000 });
      return res.json("Success");
    } else {
      console.log("Incorrect Password");
      return res.json("Password is incorrect");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createItem", verifyUser, (req, res) => {
  const { title, calories, price, category, imageAsset, quantity, id } =
    req.body;
  ItemModel.create({
    title,
    calories,
    price,
    category,
    imageAsset,
    quantity,
    id,
  })
    .then((result) => res.json("success"))
    .catch((err) => res.json(err));
});

app.get("/logout", (req, res) => {
  res.clearCookie("fwa_auth_token");
  return res.json("Success");
});

app.get("/getItems", (req, res) => {
  console.log("Harsh");
  ItemModel.find()
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});
app.listen(port, () => {
  console.log("Server is Running", port);
});
