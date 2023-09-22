const { Schema, model } = require("mongoose");
const commonSchema = require("../../utilis/commonSchema");
const authSchema = new Schema({
  email: { type: String, required: true },
  token: { type: Number, required: true },
  ...commonSchema,
});

module.exports = model("Auth", authSchema);
