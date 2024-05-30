const { Horoscope, HoroscopeModel } = require("../models/Horoscope")

exports.getHoroscope = async (req, res) => {

    console.log(req.user)
    const sign = req.params.sign || req.user.sign
    if(!sign) {
        return res.status(400).send({error: 'Sign is required'})
    }

    try {
        const data = await Horoscope.getHoroscope(sign)
        if(!data) {
            return res.status(404).send({error: 'Horoscope not found'})
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

exports.saveHoroscope = async (req, res) => {
    const user = req.user

    if(!user) {
        return res.status(401).send({error: 'Unauthorized'})
    }
    const { date, sign, card_of_day_meaning, love_horoscope, health_horoscope, money_horoscope, lucky_numbers } = req.body

    if(!date || !sign || !card_of_day_meaning || !love_horoscope || !health_horoscope || !money_horoscope || !lucky_numbers) {
        return res.status(400).send({error: 'All fields are required'})
    }

    try {
        const horoscope = new HoroscopeModel({ date, sign, card_of_day_meaning, love_horoscope, health_horoscope, money_horoscope, lucky_numbers, user_id: user._id })
        await horoscope.save()
        return res.status(201).json(horoscope)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

exports.getUserHoroscopes = async (req, res) => {
    const user = req.user
    if(!user) {
        return res.status(401).send({error: 'Unauthorized'})
    }
    try {
        const horoscopesPage = HoroscopeModel.aggregate()
        let query = horoscopesPage.match({ user_id: user._id })
        const horoscopes = await HoroscopeModel.aggregatePaginate(query, { page: req.query.page || 1, limit: 5 })
        return res.status(200).json(horoscopes)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}