const mariaHelenaScraper = require("../../webscraper");


class Horoscope {
    constructor(date,sign ,card_of_day_meaning,love_horoscope, health_horoscope, money_horoscope,lucky_numbers) {

        this.date = date
        this.sign = sign
        this.card_of_day_meaning = card_of_day_meaning
        this.love_horoscope = love_horoscope
        this.health_horoscope = health_horoscope
        this.money_horoscope = money_horoscope
        this.lucky_numbers = lucky_numbers

    }

    static async getHoroscope(sign){
        return mariaHelenaScraper(sign)
    }
}

module.exports = Horoscope