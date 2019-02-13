const Sequelize = require('sequelize');

const { Model } = require('../dataClasses/model');

class Role extends Model {
  static get modelFields() {
    return {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
    };
  }

  static associate() {
    super.associate();

    // eslint-disable-next-line
    const User = require('./user');
    Role.hasMany(User);

    return this;
  }
}

module.exports = Role.init();
