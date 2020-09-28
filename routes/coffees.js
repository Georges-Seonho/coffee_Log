const express = require('express');
const router = express.Router();
const Coffee = require('../models/Coffee')

router.get('/create', (req, res, next) => res.render('./coffees/new_coffee'));

router.post('/create', (req, res, next) => {
    try {
        Coffee.create(req.body);
        res.redirect('/');
    }
    catch(err) { next(err);
    }
});

module.exports = router;
