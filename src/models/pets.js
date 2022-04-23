const {model, Schema} = require('mongoose')

const Pet = new Schema({
    _id: String,
    id: Number,
    name: String,
    species: String,
    breed: String,
    sex: {
        type: String,
        enum: ["Macho","Hembra"]
    },
    size: String,
    color: String,
    photo: String,
    description: String,

    rage: Boolean,
    danger: Boolean,
    sterile: Boolean,

    bornDate: Date,
    adoptionDate: Date,

    date: {
        type: Date,
        default:  new Date(new Date().setHours(0,0,0,0)).getTime()
    }
})


module.exports = model('Pets', Pet)


/* {
    "id": 4709,
    "ficha": "04423",
    "raza": "AMERICAN STAFFORDSHIRE TERRIER",
    "sexo": "Macho",
    "fechaNac": "2010-09-07T00:00:00",
    "edad": "Mayor (5 años)",
    "tamagno": "Grande (26-44 kg)",
    "observaciones": "es necesaria licencia y seguro. \r\n\r\nES muy  bueno y jugueton con la gente, muy activo.\r\nPero no se lleva bien con otros perros y perras. \r\nIdeal para una casa sin perros\r\nEstá esterilizado\r\nSE MERECE UN HOGAR!!\r\nTerry actualmente no se encuentra en el centro por lo que si quieres adoptarlo debes contactar con nosotros en el 976836554.",
    "foto": "//www.zaragoza.es/cont/paginas/IMSP/mascotas/terry2.jpg",
    "nombre": "Terry (G)",
    "especie": "Canina",
    "color": "Blanco y Atigrado",
    "peligroso": true,
    "microchip": "NO/941000017300165",
    "cartilla": "NO/ES02178853",
    "rabia": false,
    "fechaRabia": "2014-12-31T00:00:00",
    "esterilizado": true,
    "evaluacion": "Apto",
    "caracter": "Positivo",
    "observacionesVet": "27/12/14 rabia\r\n13/3/15 esterilizado cmpa zgz\r\n31/12/15 rabia\r\n18/01/2016 Llevado a guardería.\r\n13/02/19 leishmania negativo calva en cabeza",
    "fechaIngreso": "2014-09-07T00:00:00",
    "formaEntrada": "Servicio",
    "entrada": "Encontrado",
    "urgencias": true,
    "horaUrgencias": "16:14",
    "numPolicia": "1272 (Llamada) y 924 + 1521(+-) (Presente)",
    "nombreSolicitante": "Policía Local",
    "domicilioSolicitante": "C/ Rioja nº14",
    "disponible": "1",
    "tasa": "Ent: Encontrado+ sal: ",
    "importe": "0.0",
    "bloquear": false,
    "desbloquear": false
  } */