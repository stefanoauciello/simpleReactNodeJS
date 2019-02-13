const cron = require('node-cron');
const synchro = require('./synchroDatabase');

console.log('cron initialized.');

cron.schedule('* * * * *', () => {
  console.log('synchro mongoose');
  synchro.syncDB();
});
