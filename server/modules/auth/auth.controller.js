const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("../users/user.userModel");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, saltRounds);

  return userModel.create(rest);
};
const login = async (email, password) => {
  const isValidUser = await userModel.findOne({ email });
  if (!isValidUser) throw new Error("User not Found");
  const isValid = await bcrypt.compare(password, isValidUser.password);
  if (!isValid) throw new Error("Email or Password is invalid");
  return true;
};

module.exports = { create, login };
