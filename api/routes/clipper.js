const router = require('express').Router()
const controller = require('../controllers/clipper')

router.post('/clipper', controller.clipperController)

exports.router = router;