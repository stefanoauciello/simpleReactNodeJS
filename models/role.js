const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

Role.associate = () => {
  // eslint-disable-next-line
    const User = require('./user');
  Role.hasMany(User);
};

module.exports = Role;
