const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("Menu", MenuSchema);
