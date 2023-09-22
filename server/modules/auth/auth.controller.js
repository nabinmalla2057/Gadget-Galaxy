const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("../users/user.model");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, saltRounds);

  return userModel.create(rest);
};
const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not Found");
  if (!user.isActive)
    throw new Error("User is not approved.Please contact Admin");
  if (!user.isEmailVerified)
    throw new Error("Email isnot verified. Verify your email");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Email or Password is invalid");
  return true;
};

module.exports = { create, login };
