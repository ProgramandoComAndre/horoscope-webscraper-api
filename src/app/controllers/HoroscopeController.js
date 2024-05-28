const Horoscope = require("../models/Horoscope")

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
