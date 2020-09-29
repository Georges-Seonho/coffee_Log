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
router.get('/:id', function(req, res, next) {
  res.render('user-profile');
});


module.exports = router;
