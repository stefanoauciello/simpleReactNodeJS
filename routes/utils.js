/* eslint-disable no-use-before-define */
const express = require('express');
const mongoose = require('mongoose');

const synchro = require('../dataClasses/synchroDatabase');

const router = express.Router();
const Authentication = require('./../authentication');

router.get('/mongoose', Authentication, HandleDBJson);
router.get('/alignment', Authentication, HandleDBalignment);
router.get('/clear', Authentication, HandleDBClear);

async function HandleDBJson(req, res) {
  const models = mongoose.modelNames();

  const allData = await Promise.all(models.map(async (model) => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const fileModel = require(`./../modelsNoSQL/${model}`);
    const modelObj = { [`${model}`]: await fileModel.find() };
    return [modelObj];
  }));

  res.json(allData);
}


async function HandleDBalignment(req, res) {
  try {
    synchro.syncDB();
    res.json({ status: 200 });
  } catch (exc) {
    res.json({ exception: exc.toString() });
  }
}

async function HandleDBClear(req, res) {
  try {
    const models = mongoose.modelNames();
    await Promise.all(models.map(async (model) => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const fileModel = require(`./../modelsNoSQL/${model}`);
      await fileModel.deleteMany();
    }));

    res.json({ status: 200 });
  } catch (exc) {
    res.json({ exception: exc });
  }
}

module.exports = router;
