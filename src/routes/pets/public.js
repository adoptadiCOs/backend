const router = require("express").Router();

const pets = require("../../controllers/pets.controller");

/* GET Pets list */
/**
 * @swagger
 * /pets:
 *      get:
 *          parameters:
 *              - in: query
 *                name: starts
 *                schema:
 *                    type: integer
 *                    minimum: 0
 *                    default: 0
 *                description: Page starts on
 *              - in: query
 *                name: rows
 *                schema:
 *                    type: integer
 *                    minimum: 0
 *                    maximun: 50
 *                    default: 0
 *                description: The numbers of items to return
 *              - in: query
 *                name: specie
 *                schema:
 *                    type: string
 *                description: Filter the result by specie
 *              - in: query
 *                name: breed
 *                schema:
 *                    type: string
 *                description: Filter the result by breed
 *
 *          description: "Return at most a fifty animals list"
 *          responses:
 *              200:
 *                  description: A list of pets
 *                  properties:
 *                  data:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                              type: string
 *                              description: Pet name
 *                              example: Lina
 *                          specie:
 *                              type: string
 *                              description: Pet specie
 *                              example: Canina
 *                          breed:
 *                              type: string
 *                              description: Pet breed
 *                              example: AMERICAN STAFFORDSHIRE
 *                          sex:
 *                              type: string
 *                              description: Pet sex
 *                              example: Hembra
 *                          photo:
 *                              type: string
 *                              description: url of a animal photo
 *              400:
 *                  description: something went wrong return error msg
 */
router.get("/pets", pets.GetPets);

/* GET Pets species */
/**
 * @swagger
 * /species:
 *      get:
 *          description: "Return all the species on the database"
 *          responses:
 *              200:
 *                  description: A list of species
 *                  properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          _id:
 *                              type: string
 *                              description: Specie type
 *                              example: Canina
 *
 *              400:
 *                  description: something went wrong return error msg
 */
router.get("/species", pets.GetSpecies);

/* GET Pets breeds */
/**
 * @swagger
 * /breeds:
 *      get:
 *          parameters:
 *              - in: query
 *                name: specie
 *                schema:
 *                    type: string
 *                description: Filter the result by specie
 *          description: "Return all the breeds on the database"
 *          responses:
 *              200:
 *                  description: A list of species
 *                  properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          _id:
 *                              type: string
 *                              description: Breed type
 *                              example: TERRIER
 *
 *              400:
 *                  description: something went wrong return error msg
 */
router.get("/breeds", pets.GetBreeds);

/* GET Pet by id */
/**
 * @swagger
 * /pet/public:
 *      get:
 *          parameters:
 *              - in: query
 *                name: id
 *                schema:
 *                    type: integer
 *                description: Pet id
 *          description: "Return information of pet $id"
 *          responses:
 *              200:
 *                  description: Pet info
 *                  properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Pet name
 *                              example: Lina
 *                          specie:
 *                              type: string
 *                              description: Pet specie
 *                              example: Canina
 *                          breed:
 *                              type: string
 *                              description: Pet breed
 *                              example: AMERICAN STAFFORDSHIRE
 *                          sex:
 *                              type: string
 *                              description: Pet sex
 *                              example: Hembra
 *                          photo:
 *                              type: string
 *                              description: url of a animal photo
 *                  400:
 *      description: something went wrong return error msg
 */
router.get("/pet/public", pets.GetPetPublic);

module.exports = router;
