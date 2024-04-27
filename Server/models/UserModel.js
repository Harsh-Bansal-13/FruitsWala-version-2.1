const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
require("dotenv").config();
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isSeller: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
});
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      email: this.email,
      username: this.username,
      isSeller: this.isSeller,
      id: this._id.toHexString(),
    },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "7d",
    }
  );

  console.log("harshg", token);
  return token;
};
const UserModel = mongoose.model("users", UserSchema);
const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("username"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    isSeller: Joi.boolean().optional().label("isSeller"), // Make isSeller optional
  });
  return schema.validate(data);
};

module.exports = { UserModel, validate };
