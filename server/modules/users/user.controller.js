const bcrypt = require("bcrypt");
const saltRounds = 10;
const Model = require("./user.model");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, saltRounds);

  return Model.create(rest);
};
const login = (email, password) => {};

module.exports = { create, login };
