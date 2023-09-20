const { Schema, model } = require("mongoose");
const commonSchema = require("../../utilis/commonSchema");
const { validateEmail } = require("./user.validation");

const userSchema = new Schema({
  name: { type: String, required: "Full name is required" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  ...commonSchema,
});

module.exports = model("User", userSchema);
