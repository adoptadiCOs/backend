const router = require('express').Router();

const statistics = require('../../controllers/statistics.controller')

router.get('/statistics', statistics.GetStatistics)

module.exports = router