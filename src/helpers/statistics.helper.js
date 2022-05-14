const Statistic = require("../models/statistics");

const insertStatistic = async (num) => {
  try {
    const statistic = Statistic({ num });
    await statistic.save();
  } catch (err) {
    console.log(err);
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

const insertStatisticBest = async (starts, rows) => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    date.setDate(date.getDate() - 1).getTime();

    const query = {};
    query["date"] = date;

    const res = await Pet.find(query, {}, { skip: starts, limit: rows }).select(
      {
        date: 0,
        id: 0,
        size: 0,
        color: 0,
        description: 0,
        rage: 0,
        danger: 0,
        sterile: 0,
        bornDate: 0,
        adoptionDate: 0,
        __v: 0,
      }
    );

    return res;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { insertStatistic, findStatistics, insertStatisticBest };
