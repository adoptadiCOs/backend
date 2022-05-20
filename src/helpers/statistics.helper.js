const Statistic = require("../models/statistics");
const Pet = require("../models/pets");

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

const findPetsNumber = async () => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0));

    console.log(date);

    const res = await Pet.aggregate([
      { $match: { date: date } },
      { $group: { _id: "$specie", count: { $sum: 1 } } },
    ]);

    return {
      data: res,
      err: null,
    };
  } catch (err) {
    console.log(err);
    return {
      err: err,
    };
  }
};

module.exports = { insertStatistic, findStatistics, findPetsNumber };
