const Sequelize = require('sequelize');

const { Model } = require('../dataClasses/model');

class Classroom extends Model {
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
    return this;
  }
}

module.exports = Classroom.init();
