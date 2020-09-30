const express = require("express");
const router = express.Router();
const Log = require('../models/Log');
const requireAuth = require('../middlewares/requireAuth');

router.get("/",requireAuth, function (req, res, next) {
  res.render("dashboard", {js: ["chartsJs"]});
});

router.get('/api/waterData', async (req, res, next)=> {
  try {
    const currentUserId = req.session.currentUser._id; 
    const userLogs = await Log.find({ user : currentUserId });
    const waterDatas = [];
    userLogs.forEach(elm => waterDatas.push(elm.waterQty));
    res.json(waterDatas);
  } catch(err) {
    next(err)
  }
});

router.get('/api/coffeeQtyData', async (req, res, next)=> {
  try {
    const currentUserId = req.session.currentUser._id; 
    const userLogs = await Log.find({ user : currentUserId });
    const coffeeDatas = [];
    userLogs.forEach(elm => coffeeDatas.push(elm.coffeeQty));
    res.json(coffeeDatas);
  } catch(err) {
    next(err)
  }
});

module.exports = router;
