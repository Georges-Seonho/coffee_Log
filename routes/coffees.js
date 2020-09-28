const express = require('express');
const router = express.Router();
const Coffee = require('../models/Coffee')

//C
router.get('/create', (req, res, next) => res.render('./coffees/new_coffee'));

router.post('/create', (req, res, next) => {
    try {
        Coffee.create(req.body);
        res.redirect('/collection');
    }
    catch(err) { next(err);
    }
});

//R

//U 
router.get('/create', (req, res, next) => res.render('./coffees/edit_coffee'));

router.post('/create', (req, res, next) => {
    try {
        Coffee.create(req.body);
        res.redirect('/collection');
    }
    catch(err) { next(err);
    }
});

//D


module.exports = router;
