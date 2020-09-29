const { urlencoded } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: {
    type: String,
    default: "/public/img/profile_picture.png",
  },
  coffeeCollection: { type: Schema.Types.ObjectId, ref: "Coffee" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
