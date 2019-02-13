const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const classroom = sequelize.define('classroom', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = classroom;
