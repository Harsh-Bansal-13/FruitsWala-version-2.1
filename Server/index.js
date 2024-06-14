const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const temp = require("dotenv").config();
const port = process.env.PORT || 4000;
const login = require("./routes/login");
const createItem = require("./routes/createItem");
const register = require("./routes/register");
const logout = require("./routes/logout");
const getItems = require("./routes/getItems");
const stripePayment = require("./routes/stripePayment");
const deleteItem = require("./routes/deleteItem");
const getCartItem = require("./routes/getCartItem");
const addCartItem = require("./routes/addCartItem");
const deleteCartItem = require("./routes/deleteCartItem");
const emptycart = require("./routes/emptyCart");
const status = require("./routes/status");
const base_url = process.env.BASE_URL_FRONTEND;
const connection = require("./db");
const app = express();
console.log(base_url);
app.use(express.json());
app.use(
  cors({
    origin: [base_url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

connection();

const verifyUser = (req, res, next) => {
  const token = req.cookies.fwa_auth_token;
  if (!token) {
    return res.json("The token is missing");
  } else {
    console.log("hi");
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

app.get("/api", verifyUser, (req, res) => {
  return res.json({
    email: req.email,
    username: req.username,
    isSeller: req.isSeller,
    id: req.id,
  });
});

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/createItem", createItem);
app.use("/getItems", getItems);
app.use("/deleteItem", deleteItem);
app.use("/status", status);
app.use("/create-checkout-session", stripePayment);
app.use("/add-cart-item", addCartItem);
app.use("/delete-cart-item/", deleteCartItem);
app.use("/get-cart-item/", getCartItem);
app.use("/empty-cart/", emptycart);

app.listen(port, () => {
  console.log("Server is Running", port);
});
