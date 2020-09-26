const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const techniqueSchema = new Schema({
  name: String,
  image: String,
  temperature: Number,
});

const Technique = mongoose.model("Technique", techniqueSchema);

module.exports = Technique;
