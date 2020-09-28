var express = require("express");
var router = express.Router();

const Technique = require("../models/Technique");
const Coffee = require("../models/Coffee");
const Log = require("../models/Log");

router.get("/create", async (req, res, next) => {
  try {
    const techniques = await Technique.find();
    const coffees = await Coffee.find();
    res.render("logs/new_log", { techniques, coffees, js: ["new-log"] });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newLog = req.body;
    await Log.create(newLog);
    res.redirect("/collection/logs");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
