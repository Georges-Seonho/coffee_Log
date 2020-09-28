var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
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
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
