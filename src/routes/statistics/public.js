const router = require("express").Router();

const statistics = require("../../controllers/statistics.controller");

/* GET Pet by id */
/**
 * @swagger
 * /statistics:
 *      get:
 *          responses:
 *            200:
 *              description: Statistics info
 *              properties:
 *              data:
 *                type: object
 *                properties:
 *                  1:
 *                    type: object
 *                    properties:
 *                      dogs_adopted:
 *                        type: integer
 *                        description: Total dogs adopted
 *                        example: 0
 *                      cats_adopted:
 *                        type: integer
 *                        description: Total cats adopted
 *                        example: 0
 *                      others:
 *                        type: integer
 *                        description: Total others rages of animal adopted
 *                        example: 0
 *                  2:
 *                    type: object
 *                    properties:
 *                      total_adoptions:
 *                        type: integer
 *                        description: total animal adopted
 *                      animals_in_adoption:
 *                        type: integer
 *                        description: animals stil in adoption
 *                  3:
 *                    type: object
 *                    properties:
 *                      dangerous:
 *                        type: integer
 *                        description: total dangerous animals
 *                      not_dangerous:
 *                        type: integer
 *                        description: total not dangerous animals
 */
router.get("/statistics", statistics.GetStatistics);

module.exports = router;
