require("dotenv").config();
const Technique = require("../models/Technique");
const mongoose = require("mongoose");

const techniques = [
  {
    name: "Chemex",
    image: "",
    temperature: 96
  },
  {
    name: "AeroPress",
    image: "",
    temperature: 96
  },
  {
    name: "Hario V60",
    image: "",
    temperature: 96
  },
  {
    name: "Bonmac Dripper",
    image: "",
    temperature: 96
  },
  {
    name: "Bee House Dripper",
    image: "",
    temperature: 96
  },
  {
    name: "Kalita Wave",
    image: "",
    temperature: 96
  },
  {
    name: "Moka Pot",
    image: "",
    temperature: 96
  },
  {
    name: "French Press",
    image: "",
    temperature: 96
  },
  {
    name: "Siphon",
    image: "",
    temperature: 96
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    Technique.create(techniques)
      .then((dbResult) => {
        console.log(dbResult);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
