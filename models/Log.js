const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  date: Date,
  brewTime: Number, // seconds
  brewMethod: {
    type: Schema.Types.ObjectId,
    ref: "Technique",
  },
  coffee: {
    type: Schema.Types.ObjectId,
    ref: "Coffee",
  },
  coffeeQty: Number,
  waterQty: Number,
  grindSize: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // 1 = biggest vs 5 = smallest
  },
  satisfaction: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // 1 = not happy vs 5 = really happy
  },
  acidity: {
    type: Number,
    enum: [5, 4, 3, 2, 1], // 1 = not acid vs 5 = very acid
  },
  intensity: {
    type: Number,
    enum: [5, 4, 3, 2, 1], // 1 = not intense vs 5 = very intense
  },
  bitterness: {
    type: Number,
    enum: [5, 4, 3, 2, 1], // 1 = not bitter vs 5 = very bitter
  },
  flavorProfile: {
    type: [String],
    enum: ["fruity", "acidic", "nutty", "sweet", "floral", "burned"],
  },
  description: String,
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
