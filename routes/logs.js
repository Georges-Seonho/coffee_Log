var express = require("express");
var router = express.Router();

router.get("/create", (req, res, next) => {
  res.render("logs/new_log");
});

module.exports = router;
