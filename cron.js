const cron = require('node-cron');
const synchro = require('./dataClasses/synchroDatabase');

console.log('cron initialized.');

cron.schedule('* * * * *', () => {
  console.log('synchro mongoose');
  synchro.syncDB();
});
