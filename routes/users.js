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
    res.render("user_profile", { currentUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
