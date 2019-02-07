const Sequelize = require('sequelize');

// initial connection database
console.log('Connecting to database...');

const sequelize = new Sequelize('simpleReactNodeJS', 'root', 'rootroot', {
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

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
