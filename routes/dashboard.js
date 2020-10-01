const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const requireAuth = require("../middlewares/requireAuth");
const Coffee = require("../models/Coffee");
const dayjs = require("dayjs");

router.get("/", requireAuth, async function (req, res, next) {
  res.render("dashboard", { coffees: await Coffee.find({}), js: ["chartsJs"] });
});

// Add
router.get("/:id/add", requireAuth, async (req, res, next) => {
  try {
    await Coffee.findByIdAndUpdate(req.params.id, {
      $push: { user: req.session.currentUser._id },
    });
    res.render("dashboard", { message: "added!" });
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
    userLogs.forEach((elm) =>
      ratioData.push((elm.coffeeQty / elm.waterQty) * 100)
    );
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
            acidic+=1;
            break;
          case "fruity":
            fruity+=1;
            break;
          case "floral":
            floral+=1;
            break;
          case "burned":
            burned+=1;
            break;
          case "sweet":
            sweet+=1;
            break;
          case "nutty":
            nutty+=1;
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


router.get("/api/ratioData", async (req, res, next) => {
  try {
    const currentUserId = req.session.currentUser._id;
    const userLogs = await Log.find({ user: currentUserId });
    let numOfCoffee = 0;
    let favCoffee;
    userLogs.forEach((elm) =>
      ratioData.push((elm.coffeeQty / elm.waterQty) * 100)
    );
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

module.exports = router;
