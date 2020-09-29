var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/:id", async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    res.render("user_profile", { currentUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
