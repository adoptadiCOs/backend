const Pet = require("../models/pets");

const insertAll = async (pets) => {
  try {
    await Pet.insertMany(pets);
    return {
      err: null,
    };
  } catch (err) {
    console.log(err);

    return {
      err: err,
    };
  }
};

const findPets = async (specie, breed, starts, rows) => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();

    const query = {};
    query["date"] = date;

    if (specie !== undefined) {
      query["specie"] = { $regex: specie };
    }

    if (breed !== undefined) {
      query["breed"] = { $regex: breed };
    }

    const res = await Pet.find(query, {}, { skip: starts, limit: rows }).select(
      {
        date: 0,
        _id: 0,
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

const findDangerous = async () => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0));

    console.log(date);

    const res = await Pet.aggregate([
      { $match: { date: date } },
      { $group: { _id: "$danger", count: { $sum: 1 } } },
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

const findPetByID = async (id) => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const _id = parseInt(id.toString() + date.toString(), 10).toString(16);

    const res = await Pet.findById(_id);

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

const findPetByIDPublic = async (id) => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const _id = parseInt(id.toString() + date.toString(), 10).toString(16);

    const res = await Pet.findById(_id).select({
      date: 0,
      _id: 0,
      size: 0,
      color: 0,
      description: 0,
      rage: 0,
      danger: 0,
      sterile: 0,
      bornDate: 0,
      adoptionDate: 0,
      __v: 0,
    });

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

const findSpecies = async () => {
  try {
    const res = await Pet.aggregate([{ $group: { _id: "$specie" } }]);

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

const findBreeds = async (specie) => {
  const query = {};

  if (specie !== undefined) {
    query["specie"] = specie;
  }

  try {
    const res = await Pet.aggregate([
      { $match: query },
      { $group: { _id: "$breed" } },
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

const findAdoptedAnimal = async () => {
  try {
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    const yesterday = date.setDate(date.getDate() - 1);

    const t = await Pet.find({ date: date });

    const y = await Pet.find({ date: yesterday });

    const results = t.filter(
      ({ id: id1 }) => !y.some(({ id: id2 }) => id2 === id1)
    );

    console.log(results);

    return {
      data: results,
      err: null,
    };
  } catch (err) {
    console.log(err);
    return {
      err: err,
    };
  }
};

module.exports = {
  insertAll,
  findPets,
  findSpecies,
  findBreeds,
  findPetByID,
  findDangerous,
  findPetByIDPublic,
  findAdoptedAnimal,
};
