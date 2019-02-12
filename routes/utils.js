/* eslint-disable no-use-before-define */
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Authentication = require('./../authentication');

router.get('/mongoose', Authentication, HandleDBJson);

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

module.exports = router;
