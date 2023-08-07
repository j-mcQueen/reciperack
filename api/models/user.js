const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("User", UserSchema);
