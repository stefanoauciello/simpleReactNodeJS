const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));

// connect to mysql
require('./dataClasses/sequelize');

// connect to mongodb
require('./mongodb');

// initialize cron
require('./cron');

// initialize models
fs.readdirSync('./models').forEach(async (file) => {
// eslint-disable-next-line no-param-reassign
  file = file.replace('.js', '');
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const model = require(`./models/${file}`);
  await model.sync();
  console.log(`${file} synced() `);

  try {
    if (await model.count() === 0) {
      // eslint-disable-next-line
          require(`./initialData/${file}`);
      console.log(`${file} inserted data`);
    } else {
      console.log(`${await model.count()} records found for ${file}`);
    }
  } catch (exc) {
    console.log(`no file found for ${file}`);
  }
});

fs.readdirSync('./modelsNoSQL').forEach(async (file) => {
// eslint-disable-next-line no-param-reassign
  file = file.replace('.js', '');
  // eslint-disable-next-line import/no-dynamic-require,global-require
  require(`./modelsNoSQL/${file}`);
});

// initialize routes
fs.readdirSync('./routes').forEach(async (file) => {
// eslint-disable-next-line no-param-reassign
  file = file.replace('.js', '');
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const route = require(`./routes/${file}`);
  app.use(`/${file}`, route);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
