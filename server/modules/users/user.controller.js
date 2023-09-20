const Model = require("./user.model");

const create = (payload) => {
  return Model.create(payload);
};
const login = (email, password) => {};

module.exports = { create, login };
