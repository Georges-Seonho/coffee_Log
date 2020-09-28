var express = require("express");
var router = express.Router();

const Technique = require("../models/Technique");
const Coffee = require("../models/Coffee");

router.get("/create", async (req, res, next) => {
  try {
    const techniques = await Technique.find();
    const coffees = await Coffee.find();
    res.render("logs/new_log", { techniques, coffees });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
