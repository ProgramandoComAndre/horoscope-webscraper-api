const cheerio = require('cheerio')
const axios = require('axios')
const { convertDateToISO } = require('./data_utils')

async function mariaHelenaScraper(sign="capricornio") {
    const url = "https://lifestyle.sapo.pt/astral/previsoes/maria-helena-martins?signo=" + sign
    const response = await axios.get(url)
    if(response.status !== 200) {
        throw new Error('Failed to fetch data')
    }

    const $ = cheerio.load(response.data)
    const date = $('h4').contents()[3].data
    let data = {
        date: convertDateToISO(date.split('-')[1].trim()),
        sign: sign[0].toUpperCase() + sign.slice(1)
        
    }
    const horoscope_text = $('strong').contents().map((i, el) => {
        return $(el).text()
    }).get().slice(1)

    data.card_of_day_meaning = `${horoscope_text[0].split(':')[1].trim()}${horoscope_text[1]}`
    data.love_horoscope = horoscope_text[2].split(':')[1].trim()
    data.health_horoscope = horoscope_text[3].split(':')[1].trim()
    data.money_horoscope = horoscope_text[4].split(':')[1].trim()
    data.lucky_numbers = horoscope_text[5].split(':')[1].trim().split(', ').map((number) => number.trim()).map((number) => parseInt(number))    
    return data
}

module.exports = mariaHelenaScraper