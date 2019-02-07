const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const user = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = user;
