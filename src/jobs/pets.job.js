const axios = require("axios");
const Cronjob = require("cron").CronJob;

const Pet = require("../models/pets");
const { insertAll } = require("../helpers/pets.helper");
const { insertStatistic } = require("../helpers/statistics.helper");

const URL_ADOPTION =
  "https://www.zaragoza.es/sede/servicio/mascotas?rf=html&start=0&rows=500";
const URL_PROTECCION =
  "https://www.zaragoza.es/sede/servicio/proteccion-animal?rf=html&start=0&rows=500";

const fetchFromUrl = async (url) => {
  const res = await axios.get(url);

  const results = res.data.result;
  const pets = [];

  for (let pet of results) {
    const rage = pet.rabia === true || pet.rabia === "S" ? true : false;
    const danger =
      pet.peligroso === true || pet.peligroso === "S" ? true : false;
    const sterile =
      pet.esterilizado === true || pet.esterilizado === "S" ? true : false;
    const description =
      pet.observaciones !== undefined
        ? pet.observaciones.replace(/(\r\n|\n|\r)/gm, " ").trim()
        : "";
    const specie =
      pet.especie !== undefined ? pet.especie.trim().toUpperCase() : "";
    const breed = pet.raza !== undefined ? pet.raza.trim().toUpperCase() : "";

    const new_pet = new Pet({
      id: pet.id,
      name: pet.nombre || pet.title,
      specie: specie,
      breed: breed,
      sex: pet.sexo,
      size: pet.tamagno,
      color: pet.color,
      photo: pet.foto,
      description: description,
      rage: rage,
      danger: danger,
      sterile: sterile,
      bornDate: pet.fechaNac || pet.fechaNacimiento,
      adoptionDate: pet.fechaIngreso || pet.creationDate,
    });
    pets.push(new_pet);
  }

  return pets;
};

const fetchPets = async () => {
  try {
    const pets_adoption = await fetchFromUrl(URL_ADOPTION);
    const pets_proteccion = await fetchFromUrl(URL_PROTECCION);

    const pets = [...pets_adoption, ...pets_proteccion];

    await insertAll(pets);
    await insertStatistic(pets.length);
  } catch (err) {
    console.log(err);
  }
};

const sync = new Cronjob("0 0 0 * * *", fetchPets);

module.exports = sync;
//module.exports = {sync, fetchPets}
