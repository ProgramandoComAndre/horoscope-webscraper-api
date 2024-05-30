const mariaHelenaScraper = require("../../webscraper");
const mongoose = require('mongoose')
const paginationPlugin = require('mongoose-aggregate-paginate-v2')

const horoscopeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true
    },
    card_of_day_meaning: {
        type: String
    },
    love_horoscope: {
        type: String,
        required: true
    },
    health_horoscope: {
        type: String,
        required: true
    },
    money_horoscope: {
        type: String,
        required: true
    },
    lucky_numbers: {
        type: [Number],
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

horoscopeSchema.plugin(paginationPlugin)
class Horoscope {
    static async getHoroscope(sign){
        return mariaHelenaScraper(sign)
    }
}

const HoroscopeModel = mongoose.model('Horoscope', horoscopeSchema)
module.exports = { HoroscopeModel, Horoscope } // export HoroscopeModel and Horoscope