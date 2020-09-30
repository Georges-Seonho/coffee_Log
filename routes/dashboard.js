const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const requireAuth = require("../middlewares/requireAuth");
const Coffee = require("../models/Coffee");

router.get("/", requireAuth, async function (req, res, next) {
  res.render("dashboard", { coffees: await Coffee.find({}), js: ["chartsJs"] });
});

router.get("/api/ratioData", async (req, res, next) => {
  try {
    const currentUserId = req.session.currentUser._id;
    const userLogs = await Log.find({ user: currentUserId });
    let ratioData = [];
    let datesData = [];
    let ratesData = []
    userLogs.forEach((elm) =>
      ratioData.push((elm.coffeeQty / elm.waterQty) * 100)
    );
    userLogs.forEach((elm) => {
      datesData.push(dayjs(elm.date).format("DD/MM"));
    });
    userLogs.forEach((elm) => {
      ratesData.push(elm.satisfaction)
    })
    res.json({ ratioData, datesData, ratesData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
