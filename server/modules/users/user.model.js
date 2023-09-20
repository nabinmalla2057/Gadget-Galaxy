const { Schems, model } = require("mongoose");

const userSchema = new Schema({
  name: {},
  email: {},
  password: {},
});

module.exports = model("User", userSchema);
