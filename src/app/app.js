const express = require('express')
const horoscopeRouter = require('./routers/HoroscopeRouter')
function createApp() {
    const app = express()
    app.use(express.json())

    app.use('/horoscope', horoscopeRouter)

    return app
}

module.exports = createApp