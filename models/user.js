const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  roleId: {
    type: Sequelize.STRING,
  },
});

User.associate = () => {
  // eslint-disable-next-line
  const Role = require('./role');
  User.belongsTo(Role);
};

module.exports = User;
