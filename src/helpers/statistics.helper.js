const Statistic = require("../models/statistics");

const insertStatistic = async (num) => {
  try {
    const statistic = Statistic({ num });
    await statistic.save();
  } catch (err) {
    // TODO: handle error
  }
};

const findStatistics = async () => {
  try {
    const res = await Statistic.find();
    return {
      data: res,
      err: null,
    };
  } catch (err) {
    return {
      err: err,
    };
  }
};

module.exports = { insertStatistic, findStatistics };
