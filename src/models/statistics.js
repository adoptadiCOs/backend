const { model, Schema } = require("mongoose");

const Statistic = new Schema({
  _id: {
    type: Date,
    default: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
  },
  animals_in_adoption: Number,
  daily_adoptions: Number,
  cats_adopted: Number,
  dogs_adopted: Number,
  others: Number,
});

module.exports = model("Statistics", Statistic);
