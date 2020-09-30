const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const Technique = require("../models/Technique");
const Coffee = require("../models/Coffee");
const Log = require("../models/Log");
const session = require("express-session");

// C 
router.get("/create",requireAuth, async (req, res, next) => {
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
    newLog.user = req.session.currentUser._id;
    await Log.create(newLog);
    res.redirect("/collection/logs");
  } catch (err) {
    next(err);
  }
});

// R
router.get("/:id",requireAuth, async (req, res, next) => {
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

// U
router.get("/:id/edit",requireAuth, async (req, res, next) => {
  try {
    res.render("./logs/edit_log", {
      log: await Log.findById(req.params.id),
      techniques : await Technique.find(),
      coffees: await Coffee.find(),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await Log.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/collection/logs");
  } catch (err) {
    next(err);
  }
});

//D
router.get("/:id/delete", async (req, res, next) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.redirect("/collection/logs");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
