const mongoose = require('mongoose');

const classroom = new mongoose.Schema({
  _id: String,
  name: String,
});

module.exports = mongoose.model('classroom', classroom);
