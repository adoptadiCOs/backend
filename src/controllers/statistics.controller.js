const { findStatistics } = require("../helpers/statistics.helper");
const { findDangerous } = require("../helpers/pets.helper");

const GetStatistics = async (req, res) => {
  const res1 = await findStatistics();
  const res2 = await findDangerous();

  if (res1.err !== null || res2.err !== null) {
    return res
      .status(400)
      .json({ error: "error al acceder a las estadisticas" });
  }

  console.log(res2.data);

  let dogs_adopted = 0;
  let cats_adopted = 0;
  let others = 0;
  for (let stat of res1.data) {
    dogs_adopted += stat.dogs_adopted;
    cats_adopted += stat.cats_adopted;
    others = stat.others;
  }

  let total_adoptions = dogs_adopted + cats_adopted + others;
  let animals_in_adoption = res1.data.slice(-1).pop().animals_in_adoption || 0;

  const statistics = {
    1: {
      dogs_adopted,
      cats_adopted,
      others,
    },
    2: {
      total_adoptions,
      animals_in_adoption,
    },
    3: {
      dangerous: res2.data[0].count,
      not_dangerous: res2.data[1].count,
    },
  };

  return res.status(200).json(statistics);
};

module.exports = { GetStatistics };
