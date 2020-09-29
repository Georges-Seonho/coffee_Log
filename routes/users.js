var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/:id", async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    res.render("profile/user_profile", { currentUser });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    res.render("profile/edit_profile", {
      user: await User.findById(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/user/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
