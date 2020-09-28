const express = require("express");
const router = express.Router();
const Coffee = require("../models/Coffee");

router.get("/create", (req, res, next) => res.render("./coffees/new_coffee"));

router.post("/create", (req, res, next) => {
  try {
    const newCoffee = req.body;
    console.log(newCoffee);
    Coffee.create(newCoffee);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.post("/api/create", (req, res, next) => {
  try {
    const newCoffee = req.body;
    console.log(newCoffee);
    Coffee.create(newCoffee);
    res.json(newCoffee);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
