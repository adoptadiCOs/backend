const router = require('express').Router();

const pets = require('../../controllers/pets.controller')

//TODO: documentar

/* GET Pets list */
/**
 * @swagger
 * /pets:
 *      get:
 *          parameters:
 *              - in: query
 *                  name: starts
 *                  schema:
 *                      type: integer
 *                      minimum: 0
 *                  description: Page starts on
 *              - in: query
 *                  name: rows
 *                  schema:
 *                      type: integer
 *                      minimum: 0
 *                      maximun: 50
 *                  description: The numbers of items to return
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
 *                          date:
 *                            type: integer
 *                            description: The user ID.
 *                            example: 0
 *                          id:
 *                              type: integer
 *                              description: Pet ID
 *                              example: 4477
 *                          name:
 *                              type: string
 *                              description: Pet name
 *                              example: Lina
 *                          species:
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
 *                          size:
 *                              type: string
 *                              description: average pet size
 *                              example: Mediano (11-25 kg)
 *                          color:
 *                              type: string
 *                              description: Pet color
 *                              example: BLANCO
 *                          photo:
 *                              type: string
 *                              description: url of a animal photo
 *                          description:
 *                              type: string
 *                              description: Pet description
 *                          rage:
 *                              type: boolean
 *                              description: true if pet has rage
 *                              example: false
 *                          danger:
 *                              type: boolean
 *                              description: true if pet is dangerous
 *                              example: false
 *                          sterile:
 *                              type: boolean
 *                              description: true if pet if sterile
 *                              example: false
 *                          bornDate:
 *                              type: date
 *                              description: pet born day
 *                          adoptionDate:
 *                              type: date
 *                              description: pet adoption starting day
 *              400: 
 *                  description: something went wrong return error msg
 */
router.get('/pets', pets.GetPets);

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
router.get('/species', pets.GetSpecies);

/* GET Pets breeds */
/**
 * @swagger
 * /species:
 *      get:
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
router.get('/breeds', pets.GetBreeds);

module.exports = router