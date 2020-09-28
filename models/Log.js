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
    type: String,
    enum: ["coarse", "medium", "fine", "extra fine", "turkish"],
  },
  satisfaction: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // 1 = not happy vs 5 = really happy
  },
  acidity: {
    type: String,
    enum: ["not acid", "a little acid", "neutral", "acid", "very acid"],
  },
  intensity: {
    type: String,
    enum: ["light", "moderate", "medium", "strong", "very strong"],
  },
  bitterness: {
    type: String,
    enum: ["not bitter", "a little bitter", "neutral", "bitter", "very bitter"],
  },
  flavorProfile: {
    type: [String],
    enum: ["fruity", "acidic", "nutty", "sweet", "floral", "burned"],
  },
  description: String,
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
