const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const Coffee = require("../models/Coffee");
const Technique = require("../models/Technique");
const requireAuth = require("../middlewares/requireAuth");
const dayjs = require("dayjs");

router.get("/", requireAuth, async (req, res, next) => {
  try {
    // GET FAVS COFFEES
    const currentUserId = req.session.currentUser._id;
    const userLogs = await Log.find({ user: currentUserId });
    let coffees = [];
    userLogs.forEach((elm) => coffees.push(elm.coffee));
    let favCoffees = coffees.reduce(function (acc, curr) {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
    let idFavCoffees = Object.keys(favCoffees).reduce((a, b) =>
      favCoffees[a] > favCoffees[b] ? a : b
    );
    let favCoffee = await Coffee.findById(idFavCoffees);

    //GET NUMBER OF COFFEES
    let brewMethod = [];
    userLogs.forEach((elm) => brewMethod.push(elm.brewMethod));
    let favBrewMethods = brewMethod.reduce(function (acc, curr) {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
    let idBrewMethod = Object.keys(favBrewMethods).reduce((a, b) =>
      favBrewMethods[a] > favBrewMethods[b] ? a : b
    );
    let favBrewMethod = await Technique.findById(idBrewMethod);

    //GET COFFEES
    coffees = await Coffee.find({
      user: { $nin: [req.session.currentUser._id] },
    });
    res.render("dashboard", {
      favCoffee,
      coffees,
      numOfCoffees: userLogs.length,
      favBrewMethod,
      js: ["chartsJs"],
    });
  } catch (err) {
    next(err);
  }
});

// Add
router.get("/:id/add", requireAuth, async (req, res, next) => {
  try {
    const coffee = await Coffee.findById(req.params.id);
    coffee.user.push(req.session.currentUser._id);
    await Coffee.create(coffee);
    res.redirect("/dashboard");
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
    let ratesData = [];
    userLogs.forEach((elm) => {
      let decimalsRatio = (elm.coffeeQty / elm.waterQty) * 100;
      let ratio = decimalsRatio.toFixed();
      ratioData.push(ratio);
    });
    userLogs.forEach((elm) => {
      datesData.push(dayjs(elm.date).format("DD/MM"));
    });
    userLogs.forEach((elm) => {
      ratesData.push(elm.satisfaction);
    });
    res.json({ ratioData, datesData, ratesData });
  } catch (err) {
    next(err);
  }
});

router.get("/api/profilData", async (req, res, next) => {
  try {
    const currentUserId = req.session.currentUser._id;
    const userLogs = await Log.find({ user: currentUserId }).select(
      "flavorProfile"
    );
    let acidic = 0;
    let fruity = 0;
    let floral = 0;
    let burned = 0;
    let sweet = 0;
    let nutty = 0;
    userLogs.forEach((elm) => {
      elm.flavorProfile.forEach((fp) => {
        switch (fp) {
          case "acidic":
            acidic += 1;
            break;
          case "fruity":
            fruity += 1;
            break;
          case "floral":
            floral += 1;
            break;
          case "burned":
            burned += 1;
            break;
          case "sweet":
            sweet += 1;
            break;
          case "nutty":
            nutty += 1;
            break;
          default:
            null;
        }
      });
    });
    res.json({ acidic, fruity, floral, burned, sweet, nutty });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
