const bcrypt = require("bcrypt");
const saltRounds = 10;
const authModel = require("./auth.model");
const userModel = require("../users/user.model");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  await authModel.create({ email: payload.email, token: "123456" });
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

const verifyEmail = async (emailP, tokenP) => {
  // check email exist
  const user = await authModel.findOne({ email: emailP });
  if (!user) throw new Error("User not found");

  // token compare
  const isValid = user?.token === tokenP;
  if (!isValid) throw new Error("token invalid");

  //user isEmailVerified true
  await user.Model.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );
  // authModel email doc deleteS
  await authModel.deleteOne({ email: emailP });
  return true;
  module.exports = { create, login, verifyEmail };
};
