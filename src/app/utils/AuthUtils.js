const jwt = require('jsonwebtoken')
exports.verifyAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send({ error: 'Unauthorized' })
    }

    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
        return res.status(401).send({ error: 'Unauthorized' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: 'Unauthorized' })
        }
        req.user = decoded
        next()
    })

    return res.status(500).send({ error: 'Internal Server Error' })
}
    