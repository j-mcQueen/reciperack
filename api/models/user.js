const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
});

module.exports = mongoose.model("User", UserSchema);
