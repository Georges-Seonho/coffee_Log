var express = require('express');
const User = require('../models/User');
var router = express.Router();

// D 
router.get('/:id/delete', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/collection/users");
  } catch (err) {
    next(err);
  }
});

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
