const Sequelize = require('sequelize');

const { Model } = require('../dataClasses/model');

class User extends Model {
  static get modelFields() {
    return {
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
    };
  }

  static associate() {
    super.associate();

    // eslint-disable-next-line
    const Role = require('./role');
    this.belongsTo(Role);

    return this;
  }
}

module.exports = User.init();
