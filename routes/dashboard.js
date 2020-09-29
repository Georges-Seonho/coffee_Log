var express = require("express");
var router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

router.get("/",requireAuth, function (req, res, next) {
  res.render("dashboard");
});

module.exports = router;
