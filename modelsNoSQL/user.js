const mongoose = require('mongoose');

const user = new mongoose.Schema({
  _id: String,
  username: String,
  password: String,
  roleId: String,
});

module.exports = mongoose.model('user', user);
