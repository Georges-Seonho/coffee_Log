const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const Coffee = require("../models/Coffee");


// C
router.get("/create", requireAuth, (req, res, next) => res.render("./coffees/new_coffee"));

router.post("/create", async (req, res, next) => {
  try {
    const newCoffee = req.body;
    newCoffee.user = req.session.currentUser._id;
    await Coffee.create(newCoffee);
    res.redirect("/collection/coffees");
  } catch (err) {
    next(err);
  }
});

router.post("/api/create", async (req, res, next) => {
  try {
    const newCoffee = req.body;
    console.log(newCoffee);
    await Coffee.create(newCoffee);
    res.json(newCoffee);
  } catch (err) {
    next(err);
  }
});

//R NOT NECESSARY

//U
router.get("/:id/edit",requireAuth, async (req, res, next) => {
  try {
    res.render("./coffees/edit_coffee", {
      coffee: await Coffee.findById(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await Coffee.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/collection/coffees");
  } catch (err) {
    next(err);
  }
});

//D
router.get("/:id/delete", async (req, res, next) => {
  try {
    await Coffee.findByIdAndDelete(req.params.id);
    res.redirect("/collection/coffees");
  } catch (err) {
    next(err);
  }
});

// Add
router.get("/:id/add",requireAuth, async (req, res, next) => {
  try {
    await Coffee.findByIdAndUpdate(req.params.id, {$push: { user: req.session.currentUser._id }});
    res.render('/dashboard', {message: 'added!'})
  } catch (err) {
    next(err);
  }
});


module.exports = router;
