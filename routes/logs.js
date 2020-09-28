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

router.get("/:id", async (req, res, next) => {
  try {
    const logID = req.params.id;
    const log = await Log.findById({ _id: logID })
      .populate("brewMethod")
      .populate("coffee");
    res.render("logs/log_details", { log });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
