const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.verifyAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send({ error: 'Unauthorized' })
    }

    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
        return res.status(401).send({ error: 'Unauthorized' })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: 'Unauthorized' })
        }

        const user = await User.findOne({ email: decoded.email })
        if(!user) {
            return res.status(401).send({ error: 'Unauthorized' })
        }
        req.user = user
        next()
    })
}
    