const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  menu: {
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
  },
});

module.exports = mongoose.model("User", UserSchema);
