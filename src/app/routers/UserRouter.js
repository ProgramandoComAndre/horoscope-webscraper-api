const router = require('express').Router()
const { getHoroscope } = require('../controllers/HoroscopeController')
const { createUser, confirmEmail, login } = require('../controllers/UserController')
const { verifyAuth } = require('../utils/AuthUtils')
const { validateRegistration } = require('../utils/ValidationUtils')
router.post('/', validateRegistration ,createUser)
router.patch('/email/:token', confirmEmail)
router.post('/auth', login)
router.get('/horoscope' ,verifyAuth, getHoroscope)
module.exports = router