const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
  name: String,
  country: String,
  region: String,
  dryingMethod: {
    type: String,
    enum: ["humid - washed", "naturally dried"],
  },
  altitude: {
    type: Number,
    default: 1000,
  },
  roast: {
    type: String,
    enum: ["light roast", "medium roast", "medium dark roast", "dark roast"],
  },
  flavorProfile: {
    type: [String],
    enum: ["fruity", "acidic", "nutty", "sweet", "floral", "burned"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: String,
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;
