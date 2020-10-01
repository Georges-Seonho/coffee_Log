var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.isLoggedIn) {
    res.redirect("/dashboard");
  } else {
    res.render("home", {
      css: ["mod.home.css"],
    });
  }
});

module.exports = router;
