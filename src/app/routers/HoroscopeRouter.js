const { getHoroscope } = require('../controllers/HoroscopeController')

const router = require('express').Router()

router.get('/:sign', getHoroscope)
module.exports = router