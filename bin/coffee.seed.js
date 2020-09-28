require("dotenv").config();
const Coffee = require("../models/Coffee");
const mongoose = require("mongoose");

const coffees = [
  {
    name: 'BOURBON ROUGE',
    country: 'Rwanda',
    region: 'Gakenke',
    dryingMethod: "humid - washed",
    altitude: 2100,
    roast: "medium roast",
    flavorProfile: ["acidic", "nutty"],
    image: '',
  },
  {
    name: 'HEIRLOOM',
    country: 'Ethiopia',
    region: 'Simada',
    dryingMethod: "humid - washed",
    altitude: 1700,
    roast: "light roast",
    flavorProfile: ["sweet", "fruity"],
    image: '',
  },
  {
    name: 'CATUAI JAUNE',
    country: 'Brasil',
    region: 'Sao Paulo',
    dryingMethod: "naturally dried",
    altitude: 1200,
    roast: "medium roast",
    flavorProfile: ["sweet", "nutty"],
    image: '',
  },
  {
    name: 'CATURRA',
    country: 'Colombia',
    region: 'Huila',
    dryingMethod: "humid - washed",
    altitude: 2100,
    roast: "medium roast",
    flavorProfile: ["fruity", "floral", "acidic"],
    image: '',
  }
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    Coffee.create(coffees)
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
