const mongoose = require('mongoose');

const role = new mongoose.Schema({
  _id: String,
  name: String,
});

module.exports = mongoose.model('role', role);
