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
const login = require("./routes/login");
const createItem = require("./routes/createItem");
const register = require("./routes/register");
const logout = require("./routes/logout");
const getItems = require("./routes/getItems");
const deleteItem = require("./routes/deleteItem");
const status = require("./routes/status");
const url = process.env.URL_MONGODB;
const connection = require("./db");
const app = express();
app.use(express.json());
app.use(
  cors({
    // origin: ["http://localhost:3000"],
    origin: ["https://fruits-wala.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));
// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("Connected to MongoDB Atlas database");
//   })
//   .catch((err) => {
//     console.log(url);
//     console.log("MongoDB Atlas server not connected");
//     console.error(err);
//   });

connection();

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

// app.post("/register", (req, res) => {
//   const { username, email, password, isSeller } = req.body;
//   bcrypt
//     .hash(password, 10)
//     .then((hash) => {
//       UserModel.create({ username, email, password: hash, isSeller })
//         .then((user) => res.json(user))
//         .catch((err) => res.json(err));
//     })
//     .catch((err) => console.log(err));
// });

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/createItem", createItem);
app.use("/getItems", getItems);
app.use("/deleteItem", deleteItem);
app.use("/status", status);

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password, isSeller } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       // User not found, send a response and exit the function
//       return res.json("User not exist");
//     }

//     const response = await bcrypt.compare(password, user.password);

//     if (response) {
//       const token = jwt.sign(
//         {
//           email: user.email,
//           username: user.username,
//           isSeller: user.isSeller,
//           id: user._id.toHexString(),
//         },
//         "jwt-secret-key",
//         { expiresIn: "1d" }
//       );
//       res.cookie("fwa_auth_token", token, {
//         expires: new Date(Date.now() + 25892000000),
//         secure: true,
//         httpOnly: true,
//         sameSite: "none",
//       });
//       return res.json("Success");
//     } else {
//       console.log("Incorrect Password");
//       return res.json("Password is incorrect");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/createItem", verifyUser, (req, res) => {
//   console.log(req.body);
//   console.log("vansal");
//   const { title, calories, price, category, imageAsset, quantity, userId } =
//     req.body;
//   ItemModel.create({
//     title,
//     calories,
//     price,
//     category,
//     imageAsset,
//     quantity,
//     userId,
//   })
//     .then((result) => {
//       console.log("hARSH");
//       res.json("success");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });

// app.get("/logout", (req, res) => {
//   res.clearCookie("fwa_auth_token", {
//     secure: true,
//     httpOnly: true,
//     sameSite: "none",
//     expires: new Date(0),
//   });
//   return res.json("Success");
// });

// app.get("/getItems", (req, res) => {
//   ItemModel.find()
//     .then((items) => res.json(items))
//     .catch((err) => res.json(err));
// });
// app.get("/status", (req, res) => {
//   res.status(200).json({ status: "ok", message: "Backend is running" });
// });
// app.post("/deleteItem", (req, res) => {
//   const { deletedItemId } = req.body;
//   // console.log(req.body);
//   ItemModel.findByIdAndDelete(deletedItemId)
//     .then((deletedItem) => {
//       console.log("hi");
//       if (!deletedItem) {
//         // If no item was found with the given ID, send a 404 status
//         return res.status(404).json({ error: "Item not found" });
//       }
//       res.json({ message: "Item deleted successfully", deletedItem });
//     })
//     .catch((err) => {
//       // If there was an error during the deletion process, send a 500 status
//       console.error(err);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });
app.listen(port, () => {
  console.log("Server is Running", port);
});
