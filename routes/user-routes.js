const express = require("express");
const router = express.Router();

router.get("/profile", (req, res, next) => {
  res.render("user/profile");
});

module.exports = router