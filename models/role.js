const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
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
