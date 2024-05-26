const router = require('express').Router()

const { createUser, confirmEmail, login } = require('../controllers/UserController')
const { validateRegistration } = require('../utils/ValidationUtils')

router.post('/', validateRegistration ,createUser)
router.patch('/email/:token', confirmEmail)
router.post('/auth', login)

module.exports = router