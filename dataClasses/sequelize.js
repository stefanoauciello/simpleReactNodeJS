const Sequelize = require('sequelize');

// initial connection database
console.log('Connecting to database...');

class MySequelize extends Sequelize {
  constructor() {
    super('simpleReactNodeJS', 'root', 'rootroot', {
      host: 'localhost',
      dialect: 'mysql',
      operatorsAliases: false,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    this.connect();
  }

  connect() {
    return this.authenticate().then(() => {
      console.log('MySql DB connected!');
    })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  }
}

module.exports = new MySequelize();
