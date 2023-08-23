const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title: String,
  monday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  tuesday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  wednesday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  thursday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  friday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  saturday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  sunday: [
    { meal: Number, recipe: { type: Schema.Types.ObjectId, ref: "Recipe" } },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Menu", MenuSchema);
