const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const Coffee = require('../models/Coffee');
const Technique = require('../models/Technique');
const User = require('../models/User');

router.get('/logs', async (req, res, next) => {
  res.render('collection', {logs: await Log.find({}).populate('brewMethod').populate('coffee')});
});

router.get('/coffees', async (req, res, next) => {
  res.render('collection', {coffees: await Coffee.find()});
});
   
router.get('/users', async (req, res, next) => {
  res.render('collection', {users: await User.find()});
});

router.get('/techniques', async (req, res, next) => {
  res.render('collection', {techniques: await Technique.find()});
});

module.exports = router;
