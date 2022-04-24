const router = require("express").Router();

const pets = require("../../controllers/pets.controller")

/* GET Pet by id */
/**
 * @swagger
 * /pets:
 *      get:
 *          parameters:
 *              - in: query
 *                  name: id
 *                  schema:
 *                      type: integer
 *                  description: Pet id
 *          description: "Return information of pet $id"
 *          responses:
 *              200:
 *                  description: Pet info
 *                  properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                        date:
 *                          type: integer
 *                          description: The user ID.
 *                          example: 0
 *                        id:
 *                            type: integer
 *                            description: Pet ID
 *                            example: 4477
 *                        name:
 *                            type: string
 *                            description: Pet name
 *                            example: Lina
 *                        specie:
 *                            type: string
 *                            description: Pet specie
 *                            example: Canina
 *                        breed:
 *                            type: string
 *                            description: Pet breed
 *                            example: AMERICAN STAFFORDSHIRE
 *                        sex:
 *                            type: string
 *                            description: Pet sex
 *                            example: Hembra
 *                        size:
 *                            type: string
 *                            description: average pet size
 *                            example: Mediano (11-25 kg)
 *                        color:
 *                            type: string
 *                            description: Pet color
 *                            example: BLANCO
 *                        photo:
 *                            type: string
 *                            description: url of a animal photo
 *                        description:
 *                            type: string
 *                            description: Pet description
 *                        rage:
 *                            type: boolean
 *                            description: true if pet has rage
 *                            example: false
 *                        danger:
 *                            type: boolean
 *                            description: true if pet is dangerous
 *                            example: false
 *                        sterile:
 *                            type: boolean
 *                            description: true if pet if sterile
 *                            example: false
 *                        bornDate:
 *                            type: date
 *                            description: pet born day
 *                        adoptionDate:
 *                            type: date
 *                            description: pet adoption starting day
 *                  400:
 *                  description: something went wrong return error msg
 */
router.get("/pet", pets.GetPet)

module.exports = router