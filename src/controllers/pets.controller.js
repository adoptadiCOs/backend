const {
  findPets,
  findSpecies,
  findBreeds,
  findPetByID,
} = require("../helpers/pets.helper");

const GetPets = async (req, res) => {
  const specie = req.query.specie;
  const breed = req.query.breed;
  const starts = parseInt(req.query.starts) || 0;
  const rows =
    req.query.rows < 50 && req.query.rows > 0 ? parseInt(req.query.rows) : 50;

  const { data, err } = await findPets(specie, breed, starts, rows);

  if (err !== null) {
    return res.status(400).json({ error: err });
  }

  return res.status(200).json({ data: data });
};

const GetPet = async (req, res) => {
  const id = req.query.id;

  if (id === undefined) {
    return res.status(400).json({ error: "ID required" });
  }

  const { data, err } = await findPetByID(id);

  if (err !== null) {
    return res.status(400).json({ error: err });
  }

  return res.status(200).json({ data: data });
};

const GetSpecies = async (req, res) => {
  const { data, err } = await findSpecies();
  if (err !== null) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json({ data: data });
};

const GetBreeds = async (req, res) => {
  const specie = req.query.specie;

  const { data, err } = await findBreeds(specie);
  if (err !== null) {
    return res.status(400).json({ error: err });
  }

  return res.status(200).json({ data: data });
};

module.exports = { GetPets, GetSpecies, GetBreeds, GetPet };
