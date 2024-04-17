const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("fwa_auth_token", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new Date(0),
  });
  return res.json("Success");
});

module.exports = router;
