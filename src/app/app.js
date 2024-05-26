const express = require('express')
const horoscopeRouter = require('./routers/HoroscopeRouter')
const userRouter = require('./routers/UserRouter')
function createApp() {
    const app = express()
    app.use(express.json())

    app.use('/horoscope', horoscopeRouter)
    app.use('/users', userRouter)
    return app
}

module.exports = createApp