const User = require("../models/User");
const jwt = require('jsonwebtoken')
const emailService = require('../services/EmailService')
const passwordUtils = require('../utils/PasswordUtils')

exports.createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET , { expiresIn: '1d' })
        const emailResult = await emailService.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: 'Welcome to Astrology',
            text: `${token}`
        })

        if(emailResult.accepted.length === 0) {
           return res.status(500).send({ error: 'Email not sent' })
        }

        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

exports.confirmEmail = async (req, res) =>  {
    const { token } = req.params

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: decoded.email })
        if(!user) {
            return res.status(404).send({ error: 'User not found' })
        }
        user.verified = true
        await user.save()
        return res.status(200).send({ message: 'Email confirmed' })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(!user) {
        return res.status(404).send({ error: 'Invalid Credentials' })
    }

    const isPasswordValid = await passwordUtils.comparePassword(password, user.password, user.salt)
    if(!isPasswordValid) {
        return res.status(401).send({ error: 'Invalid Credentials' })
    }

    if(!user.verified) {
        return res.status(401).send({ error: 'Email not verified' })
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET , { expiresIn: '1d' })
    return res.status(200).send({ token })
}

