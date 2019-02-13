const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const Classroom = sequelize.define('classroom', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Classroom;
