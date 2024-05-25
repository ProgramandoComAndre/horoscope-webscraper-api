const Horoscope = require("../models/Horoscope")

exports.getHoroscope = async (req, res) => {
    if(!req.params.sign) {
        return res.status(400).send({error: 'Sign is required'})
    }

    console.log(req.params.sign)
    try {
        const data = await Horoscope.getHoroscope(req.params.sign)
        if(!data) {
            return res.status(404).send({error: 'Horoscope not found'})
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}
