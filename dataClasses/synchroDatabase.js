const mongoose = require('mongoose');

class Synchro {
  constructor() {
    this.syncDB();
  }

  async syncDB() {
    const models = mongoose.modelNames();
    await Promise.all(models.map(async (model) => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const fileModel = require(`./../modelsNoSQL/${model}`);
      await fileModel.deleteMany();
    }));

    await Promise.all(models.map(async (model) => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const fileModel = require(`./../models/${model}`);
      const records = await fileModel.findAll();

      await Promise.all(records.map((record) => {
        // eslint-disable-next-line
                const NoSqlModel = require(`./../modelsNoSQL/${model}`);
        const objNoSql = new NoSqlModel(record.toJSON());
        // eslint-disable-next-line
                objNoSql._id = record.id;
        return objNoSql.save();
      }));
    }));
  }
}

module.exports = new Synchro();
