require("dotenv").config();
require("./config/dbConnection");
require("./helpers/hbs-helpers");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
); // Creates a session object, gives a cookie to client that the client sends back on every request
app.use(flash());

app.use(function (req, res, next) {
  res.locals.error_message = req.flash("error");
  res.locals.success_message = req.flash("success");
  next();
});

//CUSTOM MIDDLEWARES
app.use(require("./middlewares/exposeLoginStatus"));

//Routers
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/users"));
app.use("/collection", require("./routes/collection"));
app.use("/coffee", require("./routes/coffees"));
app.use("/logs", require("./routes/logs"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/auth", require("./routes/auth"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
