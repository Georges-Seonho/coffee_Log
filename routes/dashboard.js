const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const requireAuth = require("../middlewares/requireAuth");
const Coffee = require("../models/Coffee");
const dayjs = require('dayjs');

router.get("/", requireAuth, async function (req, res, next) {
  res.render("dashboard", { coffees: await Coffee.find({}), js: ["chartsJs"] });
});

// Add
router.get("/:id/add",requireAuth, async (req, res, next) => {
  try {
    await Coffee.findByIdAndUpdate(req.params.id, {$push: { user: req.session.currentUser._id }});
    res.render('dashboard', {message: 'added!'})
  } catch (err) {
    next(err);
  }
});

router.get("/api/ratioData", async (req, res, next) => {
  try {
    const currentUserId = req.session.currentUser._id;
    const userLogs = await Log.find({ user: currentUserId });
    let ratioData = [];
    let datesData = [];
    userLogs.forEach((elm) =>
      ratioData.push((elm.coffeeQty / elm.waterQty) * 100)
    );
    userLogs.forEach((elm) => {
      datesData.push(dayjs(elm.date).format("DD/MM"));
    });
    res.json({ ratioData, datesData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
