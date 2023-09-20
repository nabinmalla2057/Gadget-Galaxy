const { Schems, model } = require("mongoose");
const commonSchema = require("../../utilis/commonSchema");
const validateEmail = require("/.user.validation");

const userSchema = new Schema({
  name: { type: String, require: "Full name is required" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "email adress is required",
    validate: [validateemail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  ...commonSchema,
});

module.exports = model("User", userSchema);
