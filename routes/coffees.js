var express = require('express');
var router = express.Router();

router.get('/create', (req, res, next) => res.render('./coffees/new_coffee'));

router.post('/create', (req, res, next) => {

})

module.exports = router;
