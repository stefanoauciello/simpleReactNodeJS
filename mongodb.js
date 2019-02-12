const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'simpleReactNodeJS';
class Database {
  constructor() {
    this.connect();
  }

  // eslint-disable-next-line
  connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('MongoDB connected!');
      })
      .catch((err) => {
        console.error(`Database connection error ${err}`);
      });
  }
}
module.exports = new Database();
