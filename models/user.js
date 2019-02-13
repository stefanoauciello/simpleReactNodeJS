const Sequelize = require('sequelize');
const sequelize = require('./../sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
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
