var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const requireAuth = require('../middlewares/requireAuth');
const User = require("../models/User");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    res.render("auth/signin", { error: "Invalid credentials" });
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      res.render("auth/signin", { error: "Invalid credentials" });
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;
      console.log(userObject);
      res.redirect("/");
    }
  }
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.render("auth/signup", { error: "This email already exists!" });
    }

    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/signin");
  } catch (err) {
    next(err);
  }
});

router.get("/logout", requireAuth, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
