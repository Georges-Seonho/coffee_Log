const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const Log = require('../models/Log');
const Coffee = require('../models/Coffee');
const Technique = require('../models/Technique');
const User = require('../models/User');

router.get('/logs', requireAuth, async (req, res, next) => {
  res.render('collection', {logs: await Log.find({}).populate('brewMethod').populate('coffee')});
});

router.get('/coffees', requireAuth, async (req, res, next) => {
  res.render('collection', {coffees: await Coffee.find()});
});
   
router.get('/users', requireAuth, async (req, res, next) => {
  res.render('collection', {users: await User.find()});
});

router.get('/techniques', requireAuth, async (req, res, next) => {
  res.render('collection', {techniques: await Technique.find()});
});

module.exports = router;
