const axios = require("axios");
const Cronjob = require("cron").CronJob;

const Pet = require("../models/pets");
const { insertAll } = require("../helpers/pets.helper");
//const { insertStatistic } = require("../helpers/statistics.helper");
const { postTwit } = require("../helpers/twitter.helper");

const URL_ADOPTION =
  "https://www.zaragoza.es/sede/servicio/mascotas?rf=html&start=0&rows=750";
const URL_PROTECCION =
  "https://www.zaragoza.es/sede/servicio/proteccion-animal?rf=html&start=0&rows=750";

const fetchFromUrl = async (url) => {
  const res = await axios.get(url);

  const results = res.data.result;
  const date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
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

    const _id = parseInt(pet.id.toString() + date.toString(), 10).toString(16);

    const new_pet = new Pet({
      _id: _id,
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
      date: date,
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

    //await insertAll(pets);

    // Creamos array con los meses del año
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    // Creamos array con los días de la semana
    const dias_semana = [
      "Domingo",
      "Lunes",
      "martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    // Creamos el objeto fecha instanciándolo con la clase Date
    const fecha = new Date();
    // Construimos el formato de salida
    date =
      dias_semana[fecha.getDay()] +
      ", " +
      fecha.getDate() +
      " de " +
      meses[fecha.getMonth()] +
      " de " +
      fecha.getUTCFullYear();
    const tweet = `Buen dia ${date} a todos los amantes de los animaliCOs!!! \n solo pasabamos para recordaros que seguimos teniendo ${pets.length} animales para poder adoptar! \n\n pasaros por nuestra pagina web para poder descubrirlos a todos 😇😇`;

    postTwit(tweet);
  } catch (err) {
    console.log(err);
  }
};

const sync = new Cronjob("0 0 0 * * *", fetchPets);

module.exports = sync;
//module.exports = { sync, fetchPets };
