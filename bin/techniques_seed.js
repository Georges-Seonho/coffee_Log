require("dotenv").config();
const Technique = require("../models/Technique");
const mongoose = require("mongoose");

const techniques = [
  {
    name: "Chemex",
    image: "https://static.thenounproject.com/png/2519370-200.png",
    temperature: 96
  },
  {
    name: "AeroPress",
    image: "https://static.thenounproject.com/png/1025605-200.png",
    temperature: 94
  },
  {
    name: "Hario V60",
    image: "https://static.thenounproject.com/png/1025616-200.png",
    temperature: 92
  },
  {
    name: "Kalita Wave",
    image: "https://static.thenounproject.com/png/2553307-200.png",
    temperature: 96
  },
  {
    name: "Moka Pot",
    image: "https://static.thenounproject.com/png/2158537-200.png",
    temperature: 95
  },
  {
    name: "French Press",
    image: "https://static.thenounproject.com/png/29678-200.png",
    temperature: 94
  },
  {
    name: "Siphon",
    image: "https://static.thenounproject.com/png/3529621-200.png",
    temperature: 91
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
