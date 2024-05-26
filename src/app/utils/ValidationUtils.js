const { Signs } = require("../models/Signs")
const passwordUtils = require("../utils/PasswordUtils")
exports.validateRegistration = async (req, res, next) => {
    const { name, email, password, confirmPassword, sign } = req.body
    if (!name || !email || !password || !confirmPassword || !sign) {
        return res.status(400).send({ error: 'All fields are required' })
    }

    if(password.length < 6) {
        return res.status(400).send({ error: 'Password must be at least 6 characters' })
    }
    if (password !== confirmPassword) {
        return res.status(400).send({ error: 'Passwords do not match' })
    }
    if(Signs.isValidSign(sign.toLowerCase()) === false) {
        return res.status(400).send({ error: 'Invalid sign' })
    }

    const { hashedPassword, salt } = await passwordUtils.hashPassword(password)
    req.body.password = hashedPassword
    req.body.salt = salt
    next()
}