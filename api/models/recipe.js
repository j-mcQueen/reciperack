const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
  ingredients: String,
  steps: String,
  notes: String,
  url: String,
  source: String,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
