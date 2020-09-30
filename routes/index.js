var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isLoggedIn) {
    res.render('home');
  } else {
    res.redirect('/dashboard');
  }
});

module.exports = router;
